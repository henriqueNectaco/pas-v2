import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import axios from 'axios'
import { Button } from '@nextui-org/button'
import { Checkbox, Input } from '@nextui-org/react'
import { z } from 'zod'
import StepperComponent from '@/components/cadastroMarketplace/steper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormschemaCadastroMarketplace } from '@/@types/marketplaces'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { apiUrl } from '@/lib'
import Cookies from 'js-cookie'
import FilePondComponent from '@/components/cadastroMarketplace/filepond'
import { FilePondFile } from 'filepond'
import { useRouter } from 'next/router'

type FormschemaData = z.infer<typeof FormschemaCadastroMarketplace>

export default function CadastrarMarketplaces() {
  const router = useRouter()
  const token = Cookies.get('token')
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    watch,
  } = useForm<FormschemaData>({
    resolver: zodResolver(FormschemaCadastroMarketplace),
    mode: 'onChange',
  })
  const cobrancaPorTransacao = watch('cobrancaPorTransacao', false)
  const [marketplaceId, setMarketplaceId] = useState(null)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [loader, setLoader] = useState<File[]>([])
  const [logo, setLogo] = useState<File[]>([])
  const [favicon, setFavIcon] = useState<File[]>([])

  const stepsData = [
    { label: 'Dados Marketplace', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
    { label: 'Importar dados da Zoop', active: activeStep === 2 },
    { label: 'Reiniciar Nginx', active: activeStep === 3 },
  ]
  const handleUpdateLogo = (fileItems: FilePondFile[]) => {
    setLogo(fileItems.map((fileItem) => fileItem.file as File))
  }

  const handleUpdateLoader = (fileItems: FilePondFile[]) => {
    setLoader(fileItems.map((fileItem) => fileItem.file as File))
  }

  const handleUpdateFavIcon = (fileItems: FilePondFile[]) => {
    setFavIcon(fileItems.map((fileItem) => fileItem.file as File))
  }
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    } else {
      toast.warning('Cannot go below step 0')
    }
  }
  const RestartNginx = async () => {
    const res = await axios
      .post(
        `${apiUrl}/marketplaces/restart-nginx`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .catch((res) => {
        if (res.code === 'ERR_NETWORK') {
          toast.success('NGINX reiniciado com sucesso!')
          setActiveStep(activeStep + 1)
        }
        toast.error(res.response.data.message || 'Unknown')
      })
  }
  const importarDadosZoop = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/marketplaces/${marketplaceId}/importar-dados-zoop`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.succes === true) {
        toast.success('Rotina iniciada com sucesso!')
        setActiveStep(activeStep + 1)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const auth = async () => {
    try {
      const res = await axios.post(`${apiUrl}/autenticar`, token)
      if (res.data.success === false) {
        toast.warning('Sessão expirada')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleCadastrarMarketplace = async (dados: FormschemaData) => {
    const formData = new FormData()

    formData.append('cor', String(dados.color))
    formData.append('nome', dados.nome)
    formData.append('dominio', dados.dominio)
    formData.append('zoopMarketplaceId', dados.zoopMarketplaceId)
    formData.append('mainSellerId', dados.sellerId)
    formData.append('website', dados.website) // Handle optional fields
    formData.append('zoopPublishableKey', dados.zpk)
    formData.append('cobrancaValor', String(dados.cobrancaValor))
    formData.append('cobrancaEmail', String(dados.cobrancaEmail))
    formData.append('cobrancaPorTransacao', String(dados.cobrancaPorTransacao))
    formData.append('carne', String(dados.carne))
    formData.append('taxaAdministrativa', String(dados.taxaAdministrativa))
    formData.append('logo', logo[0])
    if (dados.cobrancaEmail !== undefined) {
      formData.append('cobrancaEmail', dados.cobrancaEmail)
    }
    if (dados.cobrancaValor !== undefined) {
      formData.append('cobrancaValor', dados.cobrancaValor)
    }
    if (favicon.length !== 0) {
      formData.append('favicon', favicon[0])
    }
    if (loader.length !== 0) {
      formData.append('loader', loader[0])
    }
    try {
      const res = await axios.post(
        `${apiUrl}/marketplaces/add`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': `Bearer ${token}`
          },
        },
      )
      if (res.data.succes === true) {
        toast.success('Marketplace cadastrado com sucesso!')
        setMarketplaceId(res.data.marketplace.id)
        setActiveStep(activeStep + 1)
      } else {
        toast.error('Alog inesperado ocorreu ')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cadastrar Marketplace.')
    }
  }

  const handleNextStep = async () => {
    const isValid = await trigger()

    if (isValid) {
      setActiveStep(activeStep + 1)
    } else {
      toast.error('Campos inválidos')
      console.log(errors)
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      handleNextStep()
    }
    if (activeStep === 1 && logo.length > 0) {
      handleSubmit(handleCadastrarMarketplace)()
    } else if (activeStep === 1 && logo.length === 0) {
      toast.warning('Arquivo logo obrigatório')
    } else if (activeStep === 2) {
      importarDadosZoop()
    } else if (activeStep === 3) {
      RestartNginx()
    }
  }
  useEffect(() => {}, [])
  return (
    <div className="max-w-screen bg-gray-200 h-full lg:h-screen lg:pt-12">
      <div className="flex flex-col items-center h-full lg:max-h-screen bg-gray-200 p-4">
        <form className="w-full max-w-7xl">
          <Card className="w-full max-w-7xl bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-center">
                Cadastrar MarketPlace (Zoop)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="hidden xl:flex md:flex lg:flex w-full border-b border-black items-center justify-center lg:mb-6">
                <StepperComponent
                  stepsData={stepsData}
                  activeStep={activeStep}
                />
              </div>

              {activeStep === 0 && (
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-6 pt-2">
                  <div>
                    <Input
                      {...register('nome')}
                      name="nome"
                      placeholder={'Nome'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.nome && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('zoopMarketplaceId')}
                      name="zoopMarketplaceId"
                      placeholder={'Zoop Marketplace Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.zoopMarketplaceId && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.zoopMarketplaceId.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('dominio')}
                      name="dominio"
                      placeholder={'Dominio'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.dominio && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.dominio.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('sellerId')}
                      name="sellerId"
                      placeholder={'Main Seller Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.sellerId && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.sellerId.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('website')}
                      name="website"
                      placeholder={'Website'}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.website && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.website.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('zpk')}
                      name="zpk"
                      placeholder={'ZPK'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.zpk && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.zpk.message}
                      </span>
                    )}
                  </div>

                  {cobrancaPorTransacao && (
                    <>
                      <div>
                        <Input
                          required={cobrancaPorTransacao}
                          {...register('cobrancaValor')}
                          name="cobrancaValor"
                          placeholder={'Valor da Cobrança*'}
                          variant="underlined"
                          labelPlacement="inside"
                        />
                        {errors.cobrancaValor && (
                          <span className="text-red-500 text-sm lg:text-md">
                            {errors.cobrancaValor.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <Input
                          required={cobrancaPorTransacao}
                          {...register('cobrancaEmail')}
                          name="cobrancaEmail"
                          placeholder={'Email da Cobrança*'}
                          variant="underlined"
                          labelPlacement="inside"
                        />
                        {errors.cobrancaEmail && (
                          <span className="text-red-500 text-sm lg:text-md">
                            {errors.cobrancaEmail.message}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                  <div className="p-2 pl-0 flex flex-col justify-start lg:flex lg:flex-row gap-4 ">
                    <div className="flex items-center lg:justify-center justify-start space-x-2 ">
                      <Checkbox
                        {...register('cobrancaPorTransacao')}
                        name="cobrancaPorTransacao"
                      >
                        Cobrança por transação
                      </Checkbox>
                    </div>
                    <div className="flex items-center lg:justify-center space-x-2 justify-start">
                      <Checkbox
                        {...register('taxaAdministrativa')}
                        name="taxaAdministrativa"
                      >
                        Taxa Administrativa
                      </Checkbox>
                    </div>
                    <div className="flex items-center lg:justify-center space-x-2 justify-start">
                      <Checkbox {...register('carne')} name="carne">
                        Carnê
                      </Checkbox>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="w-full h-full space-y-2">
                  <Input
                    {...register('color')}
                    className="w-full lg:w-1/3"
                    type="color"
                  />
                  <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 ">
                    <div>
                      <h1 className="font-semibold">Logo</h1>
                      <FilePondComponent
                        files={logo}
                        handleUpdateFiles={handleUpdateLogo}
                        titulo="Logo"
                        name="logo"
                        required={true}
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold">Loader</h1>
                      <FilePondComponent
                        titulo="Loader"
                        name="loader"
                        files={loader}
                        handleUpdateFiles={handleUpdateLoader}
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold">FavIcon</h1>
                      <FilePondComponent
                        titulo="FavIcon"
                        name="favicon"
                        files={favicon}
                        handleUpdateFiles={handleUpdateFavIcon}
                      />
                    </div>

                    {/* <FilePonds files={filesFavIcon} setFiles={setFilesFavIcon} label="Favicon" /> */}
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className=" p-16 flex items-center w-full justify-center">
                  <h2 className="font-semibold">
                    Clique no botão para importar dados Zoop
                  </h2>
                </div>
              )}
              {activeStep === 3 && (
                <div className=" p-16 flex items-center w-full justify-center">
                  <h2 className="font-semibold">
                    Clique no botão para reiniciar Nginx
                  </h2>
                </div>
              )}
            </CardContent>
            <CardFooter className=" flex items-center lg:justify-end gap-2">
              {activeStep === 1 && (
                <Button
                  variant="bordered"
                  size="lg"
                  color="danger"
                  onPress={handlePrevStep}
                  aria-label="previous step"
                >
                  Voltar
                </Button>
              )}
              <Button
                variant="bordered"
                size="lg"
                color="primary"
                onPress={handleNext}
                aria-label="next step"
              >
                {activeStep === 0 && 'Avançar'}
                {activeStep === 1 && 'Finalizar cadastro'}
                {activeStep === 2 && 'Importar dados zoop'}
                {activeStep === 3 && 'Reiniciar nginx'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

/*

  const [dataa, setDataa] = useState<FormschemaData>({
    nome: '',
    dominio: '',
    sellerId: '',
    website: '',
    zpk: '',
    cobrancaPorTransacao: false,
    carne: false,
    taxaAdministrativa: false,
    color: undefined,
    logo: undefined,
  })
*/

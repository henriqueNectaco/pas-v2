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

import { apiUrl, token } from '@/utils'
import { FormschemaCadastroMarketplace } from '@/types/vendas'
import { z } from 'zod'
import StepperComponent from '@/components/cadastroMarketplace/steper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FilePonds from '@/components/cadastroMarketplace/filepond'

type FormschemaData = z.infer<typeof FormschemaCadastroMarketplace>

export default function CadastrarMarketplaces() {
  const { handleSubmit, register, formState: { errors, isValid }, trigger } = useForm<FormschemaData>({
    resolver: zodResolver(FormschemaCadastroMarketplace),
    mode: 'onChange' // Isso permitirá que a validação ocorra a cada mudança no formulário
  })


  const [activeStep, setActiveStep] = useState<number>(0)
  const [filesLoader, setFilesLoader] = useState<any[]>([])
  const [filesLogo, setFilesLogo] = useState<any[]>([])
  const [filesFavIcon, setFilesFavIcon] = useState<any[]>([])
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
  const [stepsData] = useState([
    { label: 'Dados Marketplace', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
    { label: 'Importar dados da zoop', active: activeStep === 2 },
    { label: 'Reiniciar Nginx', active: activeStep === 3 },
  ])

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setValidatedActiveStep(activeStep - 1)
    } else {
      toast.warning('Cannot go below step 0')
    }
  }

  const handleCadastrarMarketplace = async (dados: FormschemaData) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/cadastromarketplace`, dados)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setDataa((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const setValidatedActiveStep = (step: number) => {
    if (step >= 0 && step < 4) {
      setActiveStep(step)
    } else {
      toast.warning(`Step ${step} is out of range`)
    }
  }

  const handleNextStep = async () => {
    // Valide os campos antes de permitir o avanço
    // <-- Retorna true se não houver erros

    if (!isValid) {
      toast.error('Campos Inválidos')
    } else {
      setValidatedActiveStep(activeStep + 1)
    }
  }

  const handleNext = () => {
    switch (activeStep) {
      case 0:

        handleNextStep()
        break;
      case 1:
        handleCadastrarMarketplace(dataa)
        break;
      case 2:
        handleNextStep()
        break;
      default:
        toast.warning('Algo inesperado aconteceu')
    }
  }

  useEffect(() => {
    console.log(dataa)
    console.log(activeStep)

    console.log(errors.website)
    if (errors !== undefined) {
      console.log('tem algo errador')
    }
  }, [dataa, activeStep])

  useEffect(() => {
    setDataa((prev) => ({
      ...prev,
      logo: filesLogo[0],
      loader: filesLoader[0],
      favIcon: filesFavIcon[0]
    }))
  }, [filesLogo, filesLoader, filesFavIcon])
  const onError = (errors: any) => {
    console.log('tem errors', errors)
    // Aqui você pode tratar os erros individualmente, por exemplo:
    Object.keys(errors).forEach((field) => {
      console.log(`Erro no campo ${field}: ${errors[field]?.message}`)
    })
  }
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
                <StepperComponent stepsData={stepsData} activeStep={activeStep} />
              </div>

              {activeStep === 0 && (
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 p-6 pt-2">
                  <Input
                    onChange={handleChange}
                    name='nome'
                    value={dataa.nome}
                    placeholder={'Nome'}
                    required={true}
                    variant="underlined"
                    labelPlacement="inside"
                  />
                  <Input
                    onChange={handleChange}
                    name='zoopMarketplaceId'
                    value={dataa.sellerId}
                    placeholder={'Zoop Marketplace Id'}
                    required={true}
                    variant="underlined"
                    labelPlacement="inside"
                  />
                  <Input
                    onChange={handleChange}
                    name='dominio'
                    value={dataa.dominio}
                    placeholder={'Dominio'}
                    required={true}
                    variant="underlined"
                    labelPlacement="inside"
                  />
                  <Input
                    onChange={handleChange}
                    name='sellerId'
                    value={dataa.sellerId}
                    placeholder={'Main Seller Id'}
                    required={true}
                    variant="underlined"
                    labelPlacement="inside"
                  />
                  <div>
                    <Input
                      {...register('website')}
                      //value={props.data.website}
                      //onChange={props.onChange}
                      name='website'
                      placeholder={'Website'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.website && <span className="text-red-500 text-sm lg:text-md">{errors.website.message}</span>}
                  </div>
                  <Input
                    onChange={handleChange}
                    name='zpk'
                    value={dataa.zpk}
                    placeholder={'ZPK'}
                    required={true}
                    variant="underlined"
                    labelPlacement="inside"
                  />
                  {dataa.cobrancaPorTransacao && (
                    <>
                      <Input
                        onChange={handleChange}
                        name='cobrancaValor'
                        value={dataa.cobrancaValor}
                        placeholder={'Valor da Cobrança*'}
                        required={true}
                        variant="underlined"
                        labelPlacement="inside"
                        type='number'
                      />
                      <Input
                        onChange={handleChange}
                        name='cobrancaEmail'
                        value={dataa.cobrancaEmail}
                        placeholder={'Email da Cobrança*'}
                        required={true}
                        variant="underlined"
                        labelPlacement="inside"
                      />
                    </>
                  )}
                </div>
              )}

              {activeStep === 1 && (
                <>
                  <div className='lg:w-2/6 w-full'>
                    <span>Cor do estabelecimento</span>
                    <Input variant='flat' onChange={handleChange} name='color' type="color" />
                  </div>
                  <div className='lg:grid-cols-3 lg:grid h-full'>
                    <div className='h-full p-2'>
                      <h1 className='flex justify-center items-center font-bold'>Logo</h1>
                      <FilePonds titulo=' Logo' files={filesLogo} setFiles={setFilesLogo} />
                    </div>
                    <div className='h-full p-2'>
                      <h1 className='flex justify-center items-center font-bold'>Loader</h1>
                      <FilePonds titulo='Loader' files={filesLoader} setFiles={setFilesLoader} />
                    </div>
                    <div className='h-full p-2'>
                      <h1 className='flex justify-center items-center font-bold'>FavIcon</h1>

                      <FilePonds titulo='FavIcon' files={filesFavIcon} setFiles={setFilesFavIcon} />
                    </div>
                  </div>
                </>
              )}

              {activeStep === 2 && (
                <div>Importar dados da Zoop</div>
              )}

              {activeStep === 3 && (
                <div>Reiniciar Nginx</div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center lg:justify-end space-x-4">
              {activeStep !== 0 && (
                <Button
                  variant="bordered"
                  radius="sm"
                  color="primary"
                  onClick={handlePrevStep}
                >
                  Voltar
                </Button>
              )}
              <Button
                variant="bordered"
                radius="sm"
                color="primary"
                type={activeStep === 2 ? 'submit' : 'button'}
                onClick={handleNext}
              >
                Próximo
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

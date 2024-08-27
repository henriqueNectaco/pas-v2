import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from '@nextui-org/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { apiUrl } from '@/lib'
import { FormSchemaCadastroMarketplaceFilho } from '@/@types/marketplaces'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FilePondComponent from '@/components/cadastroMarketplace/filepond'
import { FilePondFile } from 'filepond'
import { apiAuth } from '@/pages/api/useApi'

type FormschemaData = z.infer<typeof FormSchemaCadastroMarketplaceFilho>
type estabelecimentosItems = {
  id: string
  identificacao_fatura: string
}
export default function CadastrarFilho() {
  const token = Cookies.get('token')
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
  } = useForm<FormschemaData>({
    resolver: zodResolver(FormSchemaCadastroMarketplaceFilho),
    mode: 'onChange',
  })
  const { id } = router.query
  const [estabelecimentoId, setEstabelecimentoId] = useState('')
  const [nomeFantasiaEstabelecimento, setNomeFantasiaEstabelecimento] =
    useState('')
  const [estabelecimentos, setEstabelecimentos] = useState()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [marketplaceId, setMarketplaceId] = useState(undefined)
  const [nome, setNome] = useState(undefined)
  const [logo, setLogo] = useState<File[]>([])
  const [loader, setLoader] = useState<File[]>([])
  const [favicon, setFavIcon] = useState<File[]>([])
  const queryParams = {
    nome_fantaisa: '',
  }
  const searchEstabeleciment = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/marketplace/${id}/estabelecimentos`,
        { params: queryParams, headers: { Authorization: `Bearer ${token}` } },
      )
      setEstabelecimentos(res.data.estabelecimentos)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMarketplace = async () => {
    try {
      const res = await axios.get(`${apiUrl}/marketplace/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMarketplaceId(res.data.marketplace.id)
      setNome(res.data.marketplace.mainECNomeFantasia)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegisterMarketplaceChild = async (data: FormschemaData) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('marketplaceId', String(marketplaceId))
    formData.append('estabelecimentoId', String(estabelecimentoId))
    formData.append('cor', data.cor)
    formData.append('nome', data.nome)
    formData.append('website', data.website)
    formData.append('dominio', data.dominio)
    formData.append('logo', logo[0])
    if (loader.length !== 0) {
      formData.append('loader', loader[0])
    }
    if (favicon.length !== 0) {
      formData.append('favicon', favicon[0])
    }
    try {
      //      await axios.post(`${apiUrl}/marketplaces/filhos/add`,formData)
      const res = await axios.post(
        `${apiUrl}/marketplaces/filhos/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // Handle success (e.g., navigate to another page, show success message, etc.)
      if (res.data.success === true) {
        setActiveStep(activeStep + 1)
      } else {
        toast.error('algo inesperado ocorreu')
      }
    } catch (error) {
      console.error(error)
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false)
    }
  }
  const auth = async () => {
    try {
      const res = await apiAuth.post(`/autenticar`, { token })
      if (res.data.success === false) {
        toast.warning('Login expirado')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const reiniciarNginx = async () => {
    await axios
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
          router.push('/marketplaces')
        }
        toast.error(res.response.data.message || 'Unknown')
      })
  }

  // const handleUpdateLogo = (fileItems: FilePondFile[]) => {
  //   const validFiles = fileItems.filter((fileItem) => {
  //     const file = fileItem.file as File // Type casting here
  //     if (file.type === 'image/png') {
  //       return true
  //     } else {
  //       toast.warning('Apenas arquivos PNG são permitidos')
  //       return false
  //     }
  //   })

  //   setLogo(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  // }
  const handleUpdateLogo = (fileItems: FilePondFile[]) => {
    setLogo(fileItems.map((fileItem) => fileItem.file as File))
  }
  const handleUpdateLoader = (fileItems: FilePondFile[]) => {
    setLoader(fileItems.map((fileItem) => fileItem.file as File))
  }

  const handleUpdateFavIcon = (fileItems: FilePondFile[]) => {
    setFavIcon(fileItems.map((fileItem) => fileItem.file as File))
  }

  useEffect(() => {
    auth()
    fetchMarketplace()
    searchEstabeleciment()
  }, [])

  const handleNext = async () => {
    const isValid = await trigger()
    if (
      activeStep === 0 &&
      isValid &&
      logo.length !== 0 &&
      estabelecimentoId !== ''
    ) {
      handleSubmit(handleRegisterMarketplaceChild)()
    } else if (activeStep === 1) {
      reiniciarNginx()
    } else {
      toast.error('Campos invalidos')
    }
  }

  return (
    <div className="max-w-screen w-full h-full lg:h-screen bg-gray-200 lg:pt-12  flex flex-col lg:justify-start lg:items-center">
      <div className="w-full  lg:w-3/4 bg-white flex flex-col items-center shadow-2xl rounded-md  p-6">
        <h1 className=" text-lg lg:text-2xl font-bold border-b border-black w-full flex items-center justify-center p-4">
          {activeStep === 0 ? 'Cadastrar marketplace filho' : 'Reiniciar Nginx'}
        </h1>
        <form className="  w-full">
          {activeStep === 0 && (
            <div className="p-4 pt-8 pb-8 lg:grid lg:grid-rows-2 flex flex-col h-full l w-full gap-4 ">
              <div className=" flex flex-col space-y-3">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
                  {/* <div className="w-full flex flex-col">
                    <Input
                      variant="underlined"
                      disabled={true}
                      value={`${marketplaceId} - ${nome}`}
                      name="marketplace_id"
                      placeholder="Marketplace Id"
                    />
                  </div> */}
                  {estabelecimentos && (
                    <Autocomplete
                      variant="underlined"
                      size="md"
                      defaultItems={estabelecimentos}
                      label="Estabelecimento Id"
                      placeholder={
                        estabelecimentoId &&
                        nomeFantasiaEstabelecimento &&
                        `${estabelecimentoId} - ${nomeFantasiaEstabelecimento}`
                      }
                      className=""
                      fullWidth={true}
                    >
                      {(estabelecimentosItems: estabelecimentosItems) => (
                        <AutocompleteItem
                          key={estabelecimentosItems.id}
                          onClick={() => {
                            setEstabelecimentoId(estabelecimentosItems.id)
                            setNomeFantasiaEstabelecimento(
                              estabelecimentosItems.identificacao_fatura,
                            )
                          }}
                        >
                          {estabelecimentosItems.id} -
                          {estabelecimentosItems.identificacao_fatura}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                  <div className="w-full">
                    <Input
                      size="md"
                      variant="underlined"
                      {...register('nome')}
                      name="nome"
                      label="Nome"
                    />
                    {errors.nome && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <Input
                      size="md"
                      variant="underlined"
                      disabled={true}
                      value={`${marketplaceId} - ${nome}`}
                      name="marketplace_id"
                      label="Marketplace Id"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
                  <div className="w-full flex flex-col">
                    <Input
                      {...register('dominio')}
                      variant="underlined"
                      name="dominio"
                      label="Dominio"
                      size="md"
                    />
                    {errors.dominio && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.dominio.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <Input
                      {...register('website')}
                      variant="underlined"
                      name="website"
                      label="Website"
                      size="md"
                    />
                    {errors.website && (
                      <span className="text-red-500 text-sm lg:text-md">
                        {errors.website.message}
                      </span>
                    )}
                  </div>
                  <div className="flex lg:items-end items-center ">
                    <Input {...register('cor')} variant="flat" type="color" />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col lg:grid lg:grid-cols-3 gap-6">
                <div className="w-full h-full flex flex-col gap-2">
                  <h1 className="font-semibold">Logo*</h1>
                  <FilePondComponent
                    files={logo}
                    handleUpdateFiles={handleUpdateLogo}
                    name="logo"
                    titulo="Logo*"
                  />
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                  <h1 className="font-semibold ">Loader</h1>
                  <div className="w-full h-full">
                    <FilePondComponent
                      files={loader}
                      handleUpdateFiles={handleUpdateLoader}
                      titulo="Loader"
                      name="loader"
                    />
                  </div>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                  <h1 className="font-semibold">FavIcon</h1>
                  <div className="w-full h-full">
                    <FilePondComponent
                      files={favicon}
                      handleUpdateFiles={handleUpdateFavIcon}
                      name="favicon"
                      titulo="FavIcon"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
        <div className="flex  justify-center lg:justify-end  w-full    h-full">
          <Button
            color="primary"
            variant="shadow"
            type="submit"
            disabled={isLoading}
            onPress={handleNext}
          >
            {isLoading && 'Processando...'}
            {activeStep === 0 && isLoading === false && 'Finalizar cadastro'}
            {activeStep === 1 && isLoading === false && 'Reiniciar Nginx'}
          </Button>
        </div>
      </div>
    </div>
  )
}
/*
    <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <div className="p-4 lg:grid lg:grid-cols-3 flex flex-col h-full lg:h-3/4 w-full gap-4">
              <div className="h-full p-4 flex flex-col items-center justify-start lg:justify-center space-y-4 lg:space-y-6">
                <div className="w-full flex flex-col">
                  <Input
                    variant="underlined"
                    disabled={true}
                    value={`${marketplaceId} - ${nome}`}
                    name="marketplace_id"
                    placeholder="Marketplace Id"
                  />
                </div>
                <div className="w-full flex flex-col">
                  <Input
                    variant="underlined"
                    name="estabelecimento_id"
                    placeholder="Estabelecimento id"
                  />
                </div>
                <div className="w-full h-full">
                  <FilePondComponent />
                </div>
              </div>
              <div className="h-full p-4 flex flex-col items-center justify-start space-y-4 lg:space-y-6">
                <Input
                  variant="underlined"
                  {...register('nome')}
                  name="nome"
                  placeholder="Nome"
                />
                <Input {...register('cor')} variant="flat" type="color" />
                <div className="w-full h-full">
                  <FilePondComponent />
                </div>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-4 lg:space-y-6">
                <div className="w-full flex flex-col">
                  <Input
                    {...register('dominio')}
                    variant="underlined"
                    name="dominio"
                    placeholder="Dominio"
                  />
                  {errors.dominio && (
                    <span className="text-red-500 text-sm lg:text-md">
                      {errors.dominio.message}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <Input
                    {...register('website')}
                    variant="underlined"
                    name="website"
                    placeholder="Website"
                  />
                  {errors.website && (
                    <span className="text-red-500 text-sm lg:text-md">
                      {errors.website.message}
                    </span>
                  )}
                </div>
                <div className="w-full h-full">
                  <FilePondComponent />
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && <div>tesadw</div>}
          <div className="border-t  border-black  w-full ">
            <Button
              color="primary"
              variant="solid"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && 'Processando...'}
              {activeStep === 0 && 'Finalizar cadastro'}
              {activeStep === 1 && 'Reiniciar Nginx'}
            </Button>
          </div>
        </form>
        */

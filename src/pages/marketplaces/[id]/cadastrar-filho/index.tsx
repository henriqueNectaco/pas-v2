import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { apiUrl, localUrl, token } from '@/lib'
import { FormSchemaCadastroMarketplaceFilho } from '@/lib/types/marketplaces'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import FilePondComponent from '@/components/cadastroMarketplace/filepond'
import { FilePondFile } from 'filepond'

type FormschemaData = z.infer<typeof FormSchemaCadastroMarketplaceFilho>

export default function CadastrarFilho() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    watch,
  } = useForm<FormschemaData>({
    resolver: zodResolver(FormSchemaCadastroMarketplaceFilho),
    mode: 'onChange',
  })
  const router = useRouter()
  const { id } = router.query
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [marketplaceId, setMarketplaceId] = useState(undefined)
  const [nome, setNome] = useState(undefined)
  const [logo, setLogo] = useState<File[]>([])
  const [loader, setLoader] = useState<File[]>([])
  const [favicon, setFavIcon] = useState<File[]>([])
  const queryParams = {
    id_estabelecimento: id,
    nome_fantaisa: '',
  }
  const searchEstabeleciment = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/marketplace/${id}/estabelecimentos`,
        { params: queryParams, headers: { Authorization: `Bearer ${token}` } },
      )
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMarketplace = async () => {
    try {
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplace/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setMarketplaceId(res.data.marketplace.id)
      setNome(res.data.marketplace.mainECNomeFantasia)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegisterMarketplaceChild = async (data: FormschemaData) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('cor', data.cor)
    formData.append('nome', data.nome)
    formData.append('website', data.website)
    formData.append('dominio', data.dominio)

    try {
      const res = await axios.post(`${localUrl}/cadastromarketplace`, data)
      console.log(res.data)
      // Handle success (e.g., navigate to another page, show success message, etc.)
      setActiveStep(activeStep + 1)
    } catch (error) {
      console.error(error)
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false)
    }
  }
  const onSubmit = async (data: FormschemaData) => {
    const isValid = await trigger()
    if (isValid) {
      await handleRegisterMarketplaceChild(data)
    } else {
      toast.error('Campos Inválidos')
    }
  }
  const handleRestartNginx = async () => {
    try {
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateLogo = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter((fileItem) => {
      const file = fileItem.file as File // Type casting here
      if (file.type === 'image/png') {
        return true
      } else {
        toast.warning('Apenas arquivos PNG são permitidos')
        return false
      }
    })

    setLogo(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  }
  const handleUpdateLoader = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter((fileItem) => {
      const file = fileItem.file as File // Type casting here
      if (file.type === 'image/png') {
        return true
      } else {
        toast.warning('Apenas arquivos PNG são permitidos')
        return false
      }
    })
    setLoader(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  }

  const handleUpdateFavIcon = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter((fileItem) => {
      const file = fileItem.file as File // Type casting here
      if (file.type === 'image/png') {
        return true
      } else {
        toast.warning('Apenas arquivos PNG são permitidos')
        return false
      }
    })

    setFavIcon(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  }
  useEffect(() => {
    fetchMarketplace()
    searchEstabeleciment()
  }, [])

  return (
    <div className="max-w-screen w-full h-full lg:h-screen bg-gray-200 pt-8 lg:pt-16 p-4 flex flex-col lg:justify-start lg:items-center">
      <div className="w-full h-full lg:w-3/4 bg-white lg:max-h-screen lg:h-2/3 flex flex-col items-center shadow-2xl rounded-md">
        <h1 className=" text-lg lg:text-2xl font-bold border-b border-black w-full flex items-center justify-center p-4">
          {activeStep === 0 ? 'Cadastrar marketplace filho' : 'Reiniciar Nginx'}
        </h1>
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
      </div>
    </div>
  )
}

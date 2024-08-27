import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Checkbox,
  Breadcrumbs,
  BreadcrumbItem,
} from '@nextui-org/react'
// import axios from 'axios'
import { useRouter } from 'next/router'
import { FilePondFile } from 'filepond'
import { toast } from 'sonner'
import FilePondComponent from '@/components/cadastroMarketplace/filepond'
import { apiAuth, apiUrl } from '@/pages/api/useApi'
import Cookies from 'js-cookie'
import axios from 'axios'
import { localUrl } from '@/lib'
type typeData = {
  nome: string | string[] | undefined
  dominio: string | null
}

export default function App() {
  const token = Cookies.get('token')
  const [renovacao, setRenovacao] = useState(false)
  const [pki, setPki] = useState<File[]>([])
  const [crt, setCrt] = useState<File[]>([])
  const [key, setKey] = useState<File[]>([])
  const [bundleCrtFile, setBundleCrtFile] = useState<File[]>([])
  const router = useRouter()
  const { nomefantasia } = router.query
  const [data, setData] = useState<typeData>({
    nome: nomefantasia,
    dominio: null,
  })
  const [activeStep, setActiveStep] = useState<number>(2)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const isValid = () => {
    if (activeStep === 0) {
      return pki.length > 0 && data.dominio !== ''
    } else if (activeStep === 2) {
      return crt.length > 0 && key.length > 0 && bundleCrtFile.length > 0
    }
  }
  const auth = async () => {
    try {
      const res = await apiAuth.post('/autenticar', { token })
      // const res = await axios.post(`${apiUrl}/autenticar`, { token })
      if (res.data.success === false) {
        toast.warning('Sessão expirada')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const validarPki = async () => {
    try {
      const formData = new FormData()
      if (pki.length !== 0) {
        formData.append('pkiValidation', pki[0])
        formData.append('originalFileName', pki[0].name)
      }
      formData.append('nome', String(data.nome))
      formData.append('dominio', String(data.dominio))
      formData.append('renovacao', String(renovacao))
      // ${apiUrl}/estabelecimentos/validar-pki
      const res = await axios.post(`${localUrl}/adicionarssl`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          // 'Authorization': `Bearer ${token}`
        },
      })
      if (res.data.success === true && renovacao === true) {
        setActiveStep(activeStep + 1)
      } else if (res.data.success === true && renovacao === false) {
        setActiveStep(activeStep + 1)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleAdicionarSsl = async () => {
    try {
      const formData = new FormData()
      formData.append('dominio', String(data.dominio))
      formData.append('crtFile', crt[0])
      formData.append('keyFile', key[0])
      formData.append('bundleCrtFile', bundleCrtFile[0])
      // ${apiUrl}/estabelecimentos/adicionar-ssl
      const res = await axios.post(`${apiUrl}/adicionarssl`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          // 'Authorization': `Bearer ${token}`
        },
      })
      if (res.data.success === true) {
        setActiveStep(activeStep + 1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const RestartNginx = async () => {
    const res = await axios
      .post(
        `/marketplaces/restart-nginx`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .catch((res) => {
        if (res.code === 'ERR_NETWORK') {
          toast.success('NGINX reiniciado com sucesso!')
        }
        toast.error(res.response.data.message || 'Unknown')
      })
  }

  const handleUpdatePki = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter((fileItem) => {
      const file = fileItem.file as File // Type casting here
      const fileName = file.name.toLowerCase() // Get file name and convert to lower case

      // Check if the file has a .pki extension
      if (fileName.endsWith('.pki')) {
        return true
      } else {
        toast.warning('Apenas arquivos com a extensão .pki são permitidos!')
        return false
      }
    })
    setPki(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  }
  const handleUpdateCrt = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter((fileItem) => {
      const file = fileItem.file as File // Type casting here
      const fileName = file.name.toLowerCase() // Get file name and convert to lower case

      // Check if the file has a .pki extension
      if (fileName.endsWith('.crt')) {
        return true
      } else {
        toast.warning('Apenas arquivos com a extensão .crt são permitidos!')
        return false
      }
    })
    setCrt(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  }

  const handleUpdateBundleCrtFile = (fileItems: FilePondFile[]) => {
    setBundleCrtFile(fileItems.map((fileItem) => fileItem.file as File))
  }

  const handleUpdateKeyFile = (fileItems: FilePondFile[]) => {
    setKey(fileItems.map((fileItem) => fileItem.file as File))
  }
  const handleNext = async () => {
    if (activeStep === 0 && isValid()) {
      validarPki()
    } else if (activeStep === 2 && isValid()) {
      handleAdicionarSsl()
    } else if (activeStep === 2 && !isValid()) {
      toast.warning('Campos Invalidos')
    } else if (activeStep === 1) {
      RestartNginx()
    } else if (activeStep === 3) {
      RestartNginx()
    } else {
      alert('deu ruim ')
    }
  }

  useEffect(() => {
    auth()
    console.log(data)
  }, [data])
  return (
    <div className=" flex flex-col items-center bg-gray-300 max-w-screen w-full h-full lg:h-screen overflow-y-hidden p-0 lg:p-12 lg:pt-20">
      <div className=" h-full flex flex-col  bg-white shadow-xl rounded-md w-full lg:w-1/2 border  lg:h-2/3">
        <div className="p-4 border-b  border-black font-bold flex items-center justify-start text-2xl w-full">
          <Breadcrumbs underline="active" size="md">
            <BreadcrumbItem key="home" isCurrent={activeStep === 0}>
              Validar Pki
            </BreadcrumbItem>
            {renovacao === true && (
              <BreadcrumbItem key="music" isCurrent={activeStep === 1}>
                Reiniciar Nginx
              </BreadcrumbItem>
            )}
            <BreadcrumbItem key="artist" isCurrent={activeStep === 2}>
              Adicionar SSl
            </BreadcrumbItem>
            <BreadcrumbItem key="album" isCurrent={activeStep === 3}>
              Reiniciar Nginx
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        {activeStep === 0 && (
          <div className="flex flex-col lg:grid lg:grid-cols-2 border w-full h-full p-4 gap-2">
            <div className=" h-full p-4 space-y-4">
              {/* <FilePondComponent
                files={pki}
                handleUpdateFiles={handleUpdatePki}
                name="pki"
                titulo=".pki"
              /> */}
              <Input
                required={true}
                variant="underlined"
                name="dominio"
                onChange={handleChange}
                label="Dominio"
              />
              <Input
                variant="underlined"
                name="nome"
                value={String(nomefantasia)}
                disabled={true}
                label="Nome"
              />
              <Checkbox
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setRenovacao(e.target.checked)
                }}
                size="md"
                radius="md"
                name="renovacao"
              >
                Renovação?
              </Checkbox>
            </div>
            <div className="  p-4 h-full">
              <FilePondComponent
                files={pki}
                handleUpdateFiles={handleUpdatePki}
                name="pki"
                titulo=".pki"
              />
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl">Reiniciar Ngnix</h1>
          </div>
        )}
        {activeStep === 2 && (
          <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-3 gap-4 p-6">
            <div className="h-full space-y-2">
              <h1 className="font-semibold">Crt File*</h1>
              <div className="h-full ">
                <FilePondComponent
                  files={crt}
                  handleUpdateFiles={handleUpdateCrt}
                  name="crt"
                  titulo=".crt"
                />
              </div>
            </div>
            <div className="h-full space-y-2">
              <h1 className="font-semibold">Key File*</h1>
              <div className="h-full">
                <FilePondComponent
                  handleUpdateFiles={handleUpdateKeyFile}
                  name="key"
                  files={key}
                  titulo=".key*"
                />
              </div>
            </div>
            <div className="h-full space-y-2">
              <h1 className="font-semibold">Bundle Crt file*</h1>
              <div className="h-full ">
                <FilePondComponent
                  handleUpdateFiles={handleUpdateBundleCrtFile}
                  files={bundleCrtFile}
                  name="bundle Crt File"
                  titulo="bundle.crt"
                />
              </div>
            </div>
          </div>
        )}
        <div className="border-t border-black flex items-center justify-end p-4 w-full ">
          <Button
            size="md"
            variant="bordered"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === 0 && 'Validar pki'}
            {activeStep === 1 && 'Reiniciar Nginx'}
            {activeStep === 2 && 'Adicionar SSL'}
            {activeStep === 3 && 'Reiniciar Nginx'}
          </Button>
        </div>
      </div>
    </div>
  )
}
/* 

*/

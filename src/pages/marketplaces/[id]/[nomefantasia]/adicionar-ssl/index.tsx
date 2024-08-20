import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Checkbox,
  Breadcrumbs,
  BreadcrumbItem,
} from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { FilePondFile } from 'filepond'
import { toast } from 'sonner'
import FilePondComponent from '@/components/cadastroMarketplace/filepond'
import { token } from '@/lib'
type typeData = {
  nome: string | string[] | undefined
  dominio: string
}

export default function App() {
  const [renovacao, setRenovacao] = useState(false)
  const [pki, setPki] = useState<File[]>([])
  const [crt, setCrt] = useState<File[]>([])
  const [key, setKey] = useState<File[]>([])
  const [bundleCrtFile, setBundleCrtFile] = useState<File[]>([])
  const router = useRouter()
  const { id, nomefantasia } = router.query
  const [data, setData] = useState<typeData>({
    nome: nomefantasia,
    dominio: '',
  })
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  // const RestartNginx = async () => {
  //   const res = await axios
  //     .post(
  //       `/marketplaces/restart-nginx`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     )
  //     .catch((res) => {
  //       if (res.code === 'ERR_NETWORK') {
  //         toast.success('NGINX reiniciado com sucesso!')
  //       }
  //       toast.error(res.response.data.message || 'Unknown')
  //     })
  // }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL}/adicionarssl`,
        data,
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleNextStep = () => {
    switch (activeStep) {
      case 0:
        if (renovacao === true) {
          setActiveStep(activeStep + 1)
        } else {
          setActiveStep(activeStep + 1)
        }
        break
      case 1:
        handleSubmit()
        break
    }
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

    // Set the valid files to the loader
    setPki(validFiles.map((fileItem) => fileItem.file as File)) // Type casting here
  }

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className=" flex flex-col items-center bg-gray-300 max-w-screen w-full h-full lg:h-screen overflow-y-hidden p-6 lg:p-12 lg:pt-20">
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
            <div className="border h-full p-4 space-y-4">
              <FilePondComponent
                files={pki}
                handleUpdateFiles={handleUpdatePki}
                name="pki"
                titulo=".pki"
              />
            </div>
            <div className="border space-y-4 p-4 h-full">
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
                value={nomefantasia}
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
          </div>
        )}
        {activeStep === 1 && (
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl">Reiniciar Ngnix</h1>
          </div>
        )}
        {activeStep === 2 && (
          <div className="h-full w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
            <div className="h-full ">
              <FilePondComponent name="crt" titulo=".crt" />
            </div>
            <div className="h-full">
              <FilePondComponent titulo=".key*" />
            </div>
            <div className="h-full ">
              <FilePondComponent titulo="bundle.crt" />
            </div>
          </div>
        )}
        <div className="border-t border-black flex items-center justify-end p-4 w-full ">
          <Button
            size="md"
            variant="bordered"
            color="primary"
            onClick={() => setActiveStep(activeStep + 1)}
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

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
import FilePonds from '@/components/cadastroMarketplace/filepond'
import { FormschemaCadastroMarketplace } from '@/types/vendas'

import dynamic from 'next/dynamic';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


type FormschemaData = z.infer<typeof FormschemaCadastroMarketplace>
type FormErrors = z.inferFlattenedErrors<typeof FormschemaCadastroMarketplace>

const FilePond = dynamic(() => import('react-filepond').then(module => {
  const { registerPlugin } = module;
  const FilePondPluginImageExifOrientation = require('filepond-plugin-image-exif-orientation');
  const FilePondPluginImagePreview = require('filepond-plugin-image-preview');
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  return module.FilePond;
}), { ssr: false });

export default function CadastrarMarketplaces() {
  const [files, setFiles] = useState([])
  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

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
  const { handleSubmit, register, formState: { errors }, trigger, watch } = useForm<FormschemaData>({
    resolver: zodResolver(FormschemaCadastroMarketplace),
    mode: 'onChange',
  })
  const cobrancaPorTransacao = watch('cobrancaPorTransacao', false);
  const [activeStep, setActiveStep] = useState<number>(0)
  const [filesLoader, setFilesLoader] = useState<any[]>([])
  const [filesLogo, setFilesLogo] = useState<any[]>([])
  const [filesFavIcon, setFilesFavIcon] = useState<any[]>([])

  const stepsData = [
    { label: 'Dados Marketplace', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
    { label: 'Importar dados da Zoop', active: activeStep === 2 },
    { label: 'Reiniciar Nginx', active: activeStep === 3 },
  ]

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    } else {
      toast.warning('Cannot go below step 0')
    }
  }

  const handleCadastrarMarketplace = async (dados: FormschemaData) => {
    const formData = new FormData();

    // Add all form fields to FormData
    formData.append('nome', dados.nome);
    formData.append('dominio', dados.dominio);
    formData.append('sellerId', dados.sellerId);
    formData.append('website', dados.website || '');  // Handle optional fields
    formData.append('zpk', dados.zpk);
    formData.append('cobrancaPorTransacao', dados.cobrancaPorTransacao.toString());
    formData.append('carne', dados.carne.toString());
    formData.append('taxaAdministrativa', dados.taxaAdministrativa.toString());
    formData.append('file', files[0])
    // Add files to FormData


    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/cadastromarketplace`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Marketplace cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cadastrar Marketplace.');
    }
  }

  const handleNextStep = async () => {
    const isValid = await trigger()

    if (isValid) {
      setActiveStep(activeStep + 1)
    } else {
      toast.error('Campos inválidos. Corrija os erros antes de prosseguir.')
    }
  }

  const handleNext = () => {
    if (activeStep === 2) {
      handleSubmit(handleCadastrarMarketplace)()
    } else {
      handleNextStep()
    }
  }

  useEffect(() => {
    // Log errors for debugging
    console.log(errors)
  }, [errors])

  useEffect(() => {
    setDataa((prev) => ({
      ...prev,
      logo: filesLogo[0],
      loader: filesLoader[0],
      favIcon: filesFavIcon[0]
    }))
  }, [filesLogo, filesLoader, filesFavIcon])

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
                  <div>
                    <Input
                      {...register('nome')}
                      name='nome'
                      placeholder={'Nome'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.nome && <span className="text-red-500 text-sm lg:text-md">{errors.nome.message}</span>}
                  </div>
                  <div>
                    <Input
                      {...register('zoopMarketplaceId')}
                      name='zoopMarketplaceId'
                      placeholder={'Zoop Marketplace Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.zoopMarketplaceId && <span className="text-red-500 text-sm lg:text-md">{errors.zoopMarketplaceId.message}</span>}
                  </div>
                  <div>
                    <Input
                      {...register('dominio')}
                      name='dominio'
                      placeholder={'Dominio'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.dominio && <span className="text-red-500 text-sm lg:text-md">{errors.dominio.message}</span>}
                  </div>
                  <div>
                    <Input
                      {...register('sellerId')}
                      name='sellerId'
                      placeholder={'Main Seller Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.sellerId && <span className="text-red-500 text-sm lg:text-md">{errors.sellerId.message}</span>}
                  </div>
                  <div>
                    <Input
                      {...register('website')}
                      name='website'
                      placeholder={'Website'}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.website && <span className="text-red-500 text-sm lg:text-md">{errors.website.message}</span>}
                  </div>
                  <div>
                    <Input
                      {...register('zpk')}
                      name='zpk'
                      placeholder={'ZPK'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                    {errors.zpk && <span className="text-red-500 text-sm lg:text-md">{errors.zpk.message}</span>}
                  </div>
                  {cobrancaPorTransacao && (
                    <>
                      <div>
                        <Input
                          required={cobrancaPorTransacao}
                          {...register('cobrancaValor')}
                          name='cobrancaValor'
                          placeholder={'Valor da Cobrança*'}
                          variant="underlined"
                          labelPlacement="inside"
                          type='number'
                        />
                        {errors.cobrancaValor && <span className="text-red-500 text-sm lg:text-md">{errors.cobrancaValor.message}</span>}
                      </div>
                      <div>
                        <Input
                          required={cobrancaPorTransacao}
                          {...register('cobrancaEmail')}
                          name='cobrancaEmail'
                          placeholder={'Email da Cobrança*'}
                          variant="underlined"
                          labelPlacement="inside"
                        />
                        {errors.cobrancaEmail && <span className="text-red-500 text-sm lg:text-md">{errors.cobrancaEmail.message}</span>}
                      </div></>
                  )}
                  <div className="p-4 pl-0 flex flex-col justify-start lg:flex lg:flex-row gap-4 ">
                    <div className="flex items-center lg:justify-center justify-start space-x-2 ">
                      <Checkbox {...register('cobrancaPorTransacao')} name='cobrancaPorTransacao'>Cobrança por transação</Checkbox>
                    </div>
                    <div className="flex items-center lg:justify-center space-x-2 justify-start">
                      <Checkbox {...register('taxaAdministrativa')} name='taxaAdministrativa'>Taxa Administrativa</Checkbox>
                    </div>
                    <div className="flex items-center lg:justify-center space-x-2 justify-start">
                      <Checkbox {...register('carne')} name='carne'>Carnê</Checkbox>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
                  <div>
                    <h1 className='font-semibold'>Logo</h1>
                    <FilePond
                      {...register('file')}
                      maxFiles={1}
                      server={null}
                      name={'teste'}
                      onupdatefiles={handleUpdateFiles}
                    />
                  </div>

                  <FilePonds files={filesLogo} setFiles={setFilesLogo} label="Logo" />
                  <FilePonds files={filesFavIcon} setFiles={setFilesFavIcon} label="Favicon" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex border items-center justify-end gap-2">
              {activeStep !== 0 && (<Button variant="bordered" color='danger' onPress={handlePrevStep} aria-label="previous step">Voltar</Button>)}
              <Button variant="bordered" color='primary' onPress={handleNext} aria-label="next step">
                {activeStep === 3 ? 'Finalizar' : 'Próximo'}
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
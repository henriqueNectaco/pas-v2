import Header from '@/components/Header'
import Steperr from '@/components/cadastroMarketplace/steper'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CadastrarMarketplace } from '@/components/cadastroMarketplace/cadastrar-marketplace'
import axios from 'axios'

export default function CadastrarMarketplaces() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [filesLoader, setFilesLoader] = useState([])
  const [filesLogo, setFilesLogo] = useState([])
  const [filesFavIcon, setFilesFavIcon] = useState([])
  const [data, setData] = useState({
    nome: '',
    zoopMarketplaceId: '',
    dominio: '',
    sellerId: '',
    website: '',
    zpk: '',
    cobrancaPorTransacao: false,
    carne: false,
    taxaAdministrativa: false,
    color: undefined,
    logo: undefined,
  });
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
  const handleCadastrarMarketplace = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/cadastromarketplace`, {

        data
      })
    } catch (error) {
      console.error(error)
    }

  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setData((prevData) => ({
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

  const handleNextStep = () => {
    setValidatedActiveStep(activeStep + 1)
  }

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        handleNextStep()
        break;
      case 1:
        handleCadastrarMarketplace()
        break;
      case 2:
        handleNext()
        break;
      default:
        toast.warning('Algo inesperado aconteceu')
    }
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      logo: filesLogo[0],
      loader: filesLoader[0],
      favIcon: filesFavIcon[0]

    }))
  }, [filesLogo, filesLoader, filesFavIcon])
  return (
    <div className="max-w-screen     bg-gray-200 h-screen">
      <Header />
      <CadastrarMarketplace
        filesLogo={filesLogo} setFilesLogo={setFilesLogo}
        filesLoader={filesLoader} setFilesLoader={setFilesLoader} filesFavIcon={filesFavIcon} setFilesFavIcon={setFilesFavIcon}
        isLoading={false} onClickNext={handleNext} handlePrevStep={handlePrevStep} data={data} onChange={handleChange} activeStep={activeStep} stepsData={stepsData} />
    </div>
  )
}

/*    

*/

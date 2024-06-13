import Header from '@/components/Header'
import Steperr from '@/components/cadastroMarketplace/steper'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@nextui-org/button'

export default function CadastrarMarketplaces() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const setValidatedActiveStep = (step: number) => {
    if (step >= 0 && step < 5) {
      setActiveStep(step)
    } else {
      toast.warning(`Step ${step} is out of range`)
    }
  }

  const handleNextStep = () => {
    setValidatedActiveStep(activeStep + 1)
  }

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setValidatedActiveStep(activeStep - 1)
    } else {
      toast.warning('Cannot go below step 0')
    }
  }

  const stepsData = [
    { label: 'Parametros', active: activeStep === 0 },
    { label: 'Dados Marketplace', active: activeStep === 1 },
    { label: 'Arquivos', active: activeStep === 2 },
    { label: 'Importar dados da zoop', active: activeStep === 3 },
    { label: 'Reiniciar Nginx', active: activeStep === 4 },
  ]

  return (
    <div className="max-w-screen">
      <Header />
      <div className="bg-gray-200 h-screen p-4 max-w-screen">
        <h1 className="font-bold">Cadastrar Marketplace(Zoop)</h1>
        <div className="bg-white h-full w-full p-4">
          <Steperr activeStep={activeStep} stepsData={stepsData} />
          <Button onClick={handleNextStep}>Avancar</Button>
          <Button onClick={handlePrevStep}>Voltar</Button>
        </div>
      </div>
    </div>
  )
}

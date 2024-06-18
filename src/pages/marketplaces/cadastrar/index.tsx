import Header from '@/components/Header'
import Steperr from '@/components/cadastroMarketplace/steper'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

export default function CadastrarMarketplaces() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const [stepsData] = useState([
    { label: 'Parametros', active: activeStep === 0 },
    { label: 'Dados Marketplace', active: activeStep === 1 },
    { label: 'Arquivos', active: activeStep === 2 },
    { label: 'Importar dados da zoop', active: activeStep === 3 },
    { label: 'Reiniciar Nginx', active: activeStep === 4 },
  ])
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

  return (
    <div className="max-w-screen   bg-gray-200 h-screen">
      <Header />
      <div className="w-full bg-gray-200 p-4 flex flex-col justify-center items-center max-h-screen h-3/4 border-2 border-red-500  ">
        <div className="bg-white w-full h-3/4 max-w-screen">
          <Steperr activeStep={activeStep} stepsData={stepsData} />
          {activeStep === 0 ? <p>step 1</p> : null}
          {activeStep === 1 ? (
            <div className="border bg-gray-200 h-full">
              <form>
                <Input variant="underlined" />
              </form>
            </div>
          ) : null}
          {activeStep === 2 ? <p>step 3</p> : null}
          {activeStep === 3 ? <p>step 4</p> : null}
          {activeStep === 4 ? <p>step 5</p> : null}
          <Button onClick={handleNextStep}>Avancar</Button>
          <Button onClick={handlePrevStep}>Voltar</Button>
        </div>
      </div>
    </div>
  )
}

/*   <div className="bg-gray-200 max-h-screen h-screen  border border-red-500   max-w-screen">
        <h1 className="font-bold">Cadastrar Marketplace(Zoop)</h1>
        <div className="bg-white mex-h-screen w-full p-4 h-3/4 flex flex-col justify-start">
          <Steperr activeStep={activeStep} stepsData={stepsData} />

          {activeStep === 0 ? <p>step 1</p> : null}
          {activeStep === 1 ? (
            <div className="border bg-gray-200 h-full">
              <form>
                <Input variant="underlined" />
              </form>
            </div>
          ) : null}
          {activeStep === 2 ? <p>step 3</p> : null}
          {activeStep === 3 ? <p>step 4</p> : null}
          {activeStep === 4 ? <p>step 5</p> : null}
          <div className="border w-full">
            <Button onClick={handleNextStep}>Avancar</Button>
            <Button onClick={handlePrevStep}>Voltar</Button>
          </div>
        </div>
      </div>

*/

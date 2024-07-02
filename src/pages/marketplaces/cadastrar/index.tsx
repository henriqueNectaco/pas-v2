import Header from '@/components/Header'
import Steperr from '@/components/cadastroMarketplace/steper'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { CadastrarMarketplace } from '@/components/component/cadastrar-marketplace'

export default function CadastrarMarketplaces() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [data, setData] = useState(null)
  const [stepsData] = useState([
    { label: 'Dados Marketplace', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
    { label: 'Importar dados da zoop', active: activeStep === 2 },
    { label: 'Reiniciar Nginx', active: activeStep === 3 },
  ])
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

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setValidatedActiveStep(activeStep - 1)
    } else {
      toast.warning('Cannot go below step 0')
    }
  }

  return (
    <div className="max-w-screen     bg-gray-200 h-screen">
      <Header />
  
                  <CadastrarMarketplace />
    </div>
  )
}

/*    <div className="w-full bg-gray-200 p-4 flex flex-col justify-center items-center max-h-screen h-full lg:h-[80vh] border-2 border-red-500  ">
        <div className="bg-white w-full h-3/4 max-w-screen">
          <div className="max-w-screen border-b border-gray-500 ">
            <Steperr activeStep={activeStep} stepsData={stepsData} />
          </div>
          {activeStep === 0 ? (
            <div className="border h-3/4 p-4 bg-white">
              <form className="border-2 h-full flex flex-col items-center p-4 bg-gray-100">
                <h1 className="font-bold">Dados Marketplace</h1>
                <Input variant="underlined" label={'Nome'} />
                <Input variant="underlined" label={'Zoop Marketplace Id'} />
                <Input variant="underlined" label={'Dominio'} />
                <Input variant="underlined" label={'Seller Id'} />
                <Input variant="underlined" label={'Website'} />
                <Input variant="underlined" label={'zpk*'} />
              </form>
            </div>
          ) : null}
          {activeStep === 1 ? <p>step 2</p> : null}
          {activeStep === 2 ? <p>step 3</p> : null}
          {activeStep === 3 ? <p>step 4</p> : null}

          <Button onClick={handleNextStep}>Avancar</Button>
          <Button onClick={handlePrevStep}>Voltar</Button>
        </div>
      </div>

*/

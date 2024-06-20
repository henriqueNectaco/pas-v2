/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/UF1GrtxcLqw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */ import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Checkbox } from '@nextui-org/checkbox'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

import { toast } from 'sonner'
import { useState } from 'react'
import StepperComponent from '../cadastroMarketplace/steper'
type typeProps = {
  isLoading: boolean
}
export function CadastrarMarketplace(props: typeProps) {
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
    <div className="flex flex-col items-center mt-8 max-h-screen bg-gray-200 p-4">
      <Card className="w-full max-w-7xl bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-center">
            Cadastrar MarketPlace (Zoop)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" hidden xl:flex md:flex lg:flex w-full border items-center justify-center lg:mb-6">
            <StepperComponent stepsData={stepsData} activeStep={activeStep} />
          </div>
          <form className="space-y-4">
            {activeStep === 0 ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="cor">Cor*</label>
                  <Input id="cor" placeholder="Escolha uma cor" />
                </div>
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input
                      placeholder={'Nome'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                      isClearable={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder={'Zoop Marketplace Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                      isClearable={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder={'Dominio'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                      isClearable={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder={'Seller Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                      isClearable={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder={'Website'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                      isClearable={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder={'zpk'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className="p-4 pl-0  flex flex-col justify-start lg:flex lg:flex-row gap-2 border">
                  <div className="flex items-center lg:justify-center justify-start space-x-2 ">
                    <Checkbox>Cobrança por transação</Checkbox>
                  </div>
                  <div className="flex items-center lg:justify-center space-x-2 justify-start">
                    <Checkbox>Taxa Administrativa</Checkbox>
                  </div>
                  <div className="flex items-center lg:justify-center space-x-2 justify-start">
                    <Checkbox>Carnê</Checkbox>
                  </div>
                </div>
              </>
            ) : null}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center lg:justify-end space-x-4">
          <Button
            variant="bordered"
            radius="sm"
            color="primary"
            isLoading={props.isLoading}
            onClick={handlePrevStep}
          >
            Voltar
          </Button>
          <Button
            isLoading={props.isLoading}
            onClick={handleNextStep}
            variant="bordered"
            radius="sm"
            color="primary"
          >
            Próximo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

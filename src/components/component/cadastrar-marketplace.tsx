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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Stepperr from '../cadastroMarketplace/steper'
type typeProps = {
  data: {}
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
          <div className="flex justify-between items-center mb-8">
            <Stepperr />
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="transacao" />
                <Label htmlFor="transacao">Cobrança por transação</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="taxa" />
                <Label htmlFor="taxa">Taxa administrativa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="carne" />
                <Label htmlFor="carne">Carnê</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cor">Cor*</Label>
              <Input id="cor" placeholder="Escolha uma cor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name1">Nome</Label>
                <Input id="name1" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name2">Nome</Label>
                <Input id="name2" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name3">Nome</Label>
                <Input id="name3" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name4">Nome</Label>
                <Input id="name4" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name5">Nome</Label>
                <Input id="name5" placeholder="Digite o nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name6">Nome</Label>
                <Input id="name6" placeholder="Digite o nome" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline">Voltar</Button>
          <Button>Próximo</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

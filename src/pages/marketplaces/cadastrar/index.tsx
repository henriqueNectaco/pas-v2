import Header from '@/components/Header'
import Steper from '@/components/steper'
import { Button } from '@nextui-org/button'
export default function CadastrarMarketplaces() {
  return (
    <div className="max-w-screen ">
      <Header />
      <div className="bg-gray-200 h-screen p-4">
        <h1 className="font-bold">Cadastrar Marketplace(Zoop)</h1>
        <div className="bg-white h-full w-full p-4">
          <Steper />
        </div>
      </div>
    </div>
  )
}

import Header from '@/components/Header'
import Steper from '@/components/steper'

export default function CadastrarMarketplaces() {
  return (
    <div className="max-w-screen ">
      <Header />
      <div className="bg-gray-200 h-screen p-4">
        <h1 className="font-bold">Cadastrar Marketplace(Zoop)</h1>
        <div className="bg-white">
          <Steper />
        </div>
      </div>
    </div>
  )
}

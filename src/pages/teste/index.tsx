import FilePonds from '@/components/cadastroMarketplace/filepond'
import Header from '@/components/Header/index'
import Paginator from '@/components/marketplaces/pagination'

export default function Teste() {
  return (
    <div className="max-w-screen w-screen h-screen bg-gray-50">
      <Header />
      <>
        <div className="w-full bg-gray-300 h-screen lg:p-12 p-4">
          <Paginator />
        </div>
      </>
    </div>
  )
}

import FilePonds from '@/components/cadastroMarketplace/filepond'
import Header from '@/components/cadastroMarketplace/filepond/Header'

export default function Teste() {
  return (
    <div className="max-w-screen w-screen h-screen bg-gray-50">
      <Header />
      <>
        <div className="w-1/4">
          <FilePonds />
        </div>
      </>
    </div>
  )
}

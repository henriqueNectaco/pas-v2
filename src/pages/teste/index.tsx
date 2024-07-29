import FilePonds from '@/components/cadastroMarketplace/filepond'
import Header from '@/components/Header/index'
import Paginator from '@/components/marketplaces/pagination'
import NewHeader from '@/components/newHeader'
import { auth } from '@/utils/reqs'
import { useEffect } from 'react'
export default function Teste() {
  const testes = () => alert('testeasd')
  useEffect(() => {

  }, [])
  return (
    <div className="max-w-screen w-screen h-screen bg-gray-50">

      <>
        <NewHeader />
      </>
    </div>
  )
}

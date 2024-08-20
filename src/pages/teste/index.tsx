import FilePondComponents from '@/components/cadastroMarketplace/filepond/old'
import DateRangeWithTimer from '@/components/daterangepickertimer'
import { getServerSideProps as authGetServerSideProps } from '@/lib/index'
import { GetServerSideProps } from 'next'

import { useEffect } from 'react'
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Você pode adicionar lógica adicional aqui, se necessário

  return authGetServerSideProps(context)
}

export default function Teste({ dados }) {
  const testes = () => alert('testeasd')
  useEffect(() => {
    console.log(dados)
  }, [])
  return (
    <div className="max-w-screen  h-screen bg-gray-50">
      <>
        {/* <FilePondComponents /> */}
        <DateRangeWithTimer />
      </>
    </div>
  )
}

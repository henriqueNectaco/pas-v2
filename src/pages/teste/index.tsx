import FilePondss from '@/components/cadastroMarketplace/filepond/templateFilepond';
import { getServerSideProps as authGetServerSideProps } from '@/lib/index'
import { GetServerSideProps } from 'next';



import { useEffect } from 'react'
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Você pode adicionar lógica adicional aqui, se necessário

  return authGetServerSideProps(context);
};


export default function Teste({ dados }) {
  const testes = () => alert('testeasd')
  useEffect(() => {
    console.log(dados)
  }, [])
  return (
    <div className="max-w-screen  h-screen bg-gray-50">

      <>
        <FilePondss />
      </>
    </div>
  )
}

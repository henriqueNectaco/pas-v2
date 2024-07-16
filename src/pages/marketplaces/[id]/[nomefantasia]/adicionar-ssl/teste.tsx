import { useRouter } from 'next/router'
import Header from '@/components/Header/index'
import { Input } from '@nextui-org/input'
import { useEffect } from 'react'
export default function Home() {
  const router = useRouter()
  const { id, nomefantasia } = router.query
  useEffect(() => {
    console.log(id, nomefantasia)
  })
  return (
    <div className="max-w-screen w-full max-h-screen h-[100vh]  bg-gray-50 lg:overflow-y-hidden overflow-y-hidden">
      <Header />
      <div className='pb-16  p-6  lg:pb-8  lg:p-12 md:pb-8  flex flex-col bg-gray-300 h-screen max-h-screen items-center  justify-center lg:justify-start'>


        <div className='bg-white border rounded-md lg:h-3/4 h-4/5   w-full'>
          <div className='w-full border-b  border-black  flex items-center justify-center p-4 lg:p-6'>
            <h1 className='font-bold text-xl'>Validar zpk</h1>
          </div>
          <div className='border-b border-black p-4 flex flex-col items-center justify-center'>
            stepr teste
          </div>
          <div className='flex lg:grid grid-cols-3  flex-col  h-4/5  lg:gap-6  lg:p-12'>

            <div className='lg:p-6 border h-full'><Input variant='underlined' className='' /></div>
            <div className='lg:p-6 border h-full'><Input variant='underlined' className='' /></div>
            <div className='lg:p-6 border h-full'><Input variant='underlined' className='' /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

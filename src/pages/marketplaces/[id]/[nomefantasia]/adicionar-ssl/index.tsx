import { useRouter } from 'next/router'
import Header from '@/components/Header/index'
export default function Home() {
  const router = useRouter()
  const { id, nomefantasia } = router.query
  return (
    <div className="max-w-screen w-full max-h-screen h-[100vh]  bg-gray-50 lg:overflow-y-hidden overflow-y-hidden">
      <Header />
      <div className='p-6 lg:pt-20 flex flex-col bg-red-300 h-max-screen h-full items-center  justify-center lg:justify-start'>


        <div className='bg-white border rounded-md   w-full'>
          <div className='w-full border-b'>teste</div>

        </div>
      </div>
    </div>
  )
}

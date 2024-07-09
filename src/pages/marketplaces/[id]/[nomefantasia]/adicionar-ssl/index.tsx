import { useRouter } from 'next/router'
import Header from '@/components/Header'
export default function Home() {
  const router = useRouter()
  const { id, nomefantasia } = router.query
  return (
    <div className="max-w-screen w-full h-screen bg-gray-50 lg:overflow-y-hidden">
      <Header />
      <div className='p-6 flex flex-col bg-red-300 h-screen items-center justify-start'>


        <div className='bg-white border rounded-md h-2/4 w-full'>
          <div className='w-full border-b'>teste</div>

        </div>
      </div>
    </div>
  )
}

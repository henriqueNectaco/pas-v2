import { useRouter } from 'next/router'
import Header from '@/components/Header'
export default function Home() {
  const router = useRouter()
  const { id, nomefantasia } = router.query
  return (
    <div className="max-w-screen w-full h-screen bg-gray-50">
      <Header />
    </div>
  )
}

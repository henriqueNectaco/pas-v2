import Header from '@/components/Header'
import { useRouter } from 'next/router'

export default function Estabelecimentos() {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="max-w-screen w-ful h-full bg-gray-50 ">
      <Header />
      <p>{id}</p>
    </div>
  )
}

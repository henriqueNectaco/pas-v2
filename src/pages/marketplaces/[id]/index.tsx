import { useRouter } from 'next/router'

export default function IdMarketplaces() {
  const router = useRouter()
  const { id } = router.query
  return <p>teste {id} </p>
}

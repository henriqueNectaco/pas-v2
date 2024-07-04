import FilterEstabeleciments from '@/components/filterEstabeleciments'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'
import Table from '@/components/table'
export default function Estabelecimentos() {
  const [token] = useState(Cookies.get('token'))
  const [estabeleciments, setEstabeleciments] = useState()
  const router = useRouter()
  const { id } = router.query
  const Router = useRouter()
  const fetchEstabeleciments = async () => {
    try {
      const res = await axios.get(
        `
  https://api.zsystems.com.br/z1/marketplace/${id}/estabelecimentos?limit=30&page=1`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setEstabeleciments(res.data.estabelecimentos)
    } catch (error) {
      console.error(error)
    }
  }
  const handleFilter = async () => {
    try {
      const res = await axios.get(
        `
    https://api.zsystems.com.br/z1/marketplace/${id}/estabelecimentos?limit=30&page=1&id_estabelecimento=id&identificacao_fatura=nomefatura&nome_fantasia=nomefantasia`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.success === true) {
        setEstabeleciments(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const auth = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/z1/autenticar`,
        { token },
      )
      if (res.data.success === false) {
        toast.error('Sua sessão expirou faça login novamente')
        Router.push('/')
      } else {
        fetchEstabeleciments()
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    auth()
  }, [])
  return (
    <div className="max-w-screen w-full">
      <Header />
      <div className="w-full  p-4 bg-gray-200">
        <Table
          array={['Id', 'Nome', 'Nome na Fatura', ' Data de criação', '']}
          contentArray={[
            'id',
            'nome_fantasia',
            'identificacao_fatura',
            'created',
          ]}
          ColsBody={5}
          currentPage="estabelecimentosFilhos"
          data={estabeleciments}
        />
      </div>
    </div>
  )
}

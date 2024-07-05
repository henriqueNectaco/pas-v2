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
  const [data, setData] = useState({
    id_estabelecimento: '',
    identificacao_fatura: '',
    nome_fantasia: ''

  })
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
      setData(prevData => ({
        ...prevData,
        dadosE: res.data // Supondo que "dadosE" seja uma propriedade válida do estado "data"
      }))
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
        console.log('foi a reqs')
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleCleanFilter = async () => {
    const res = await axios.get(`https://api.zsystems.com.br/z1/marketplace/${id}/estabelecimentos?limit=30&page=1&id_estabelecimento=&identificacao_fatura=&nome_fantasia=`)
  }

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="max-w-screen w-full">
      <Header />

      <div className="w-full  p-4 bg-gray-200">
        <FilterEstabeleciments onChange={handleChange} />
        <Table
          array={['Id', 'Nome', 'Nome na Fatura', ' Data de criação', '']} nameFantasia
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

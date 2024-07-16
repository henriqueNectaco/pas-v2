import { useRouter } from 'next/router'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Spinner } from '@nextui-org/react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'
import Table from '@/components/table'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)

  const authRes = await axios.post(
    `https://api.zsystems.com.br/z1/autenticar`,
    { token }
  )

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const { id } = context.query
  const fetchChilds = await axios.get(
    `https://api.zsystems.com.br/marketplaces/${id}/filhos`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  return { props: { data: fetchChilds.data.estabelecimentos } }
}



export default function MarketplacesFilhos({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const token = Cookies.get('token')
  const { id } = router.query
  const [marketplacesChilds, setMarketplacesChilds] = useState(data)
  const fetchMarketplacesChilds = async () => {
    try {
      const res = await axios.get(
        `
https://api.zsystems.com.br/marketplaces/${id}/filhos`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setMarketplacesChilds(res.data.estabelecimentos)
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
      if (res.data.success === true) {
        fetchMarketplacesChilds()
      } else {
        toast.error('Sua sessão expirou faça login novamente')
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="h-full max-w-screen w-full bg-gray-200 flex flex-col items-center  border-2 ">
      <Header />
      <>
        {!marketplacesChilds ? (
          <Spinner size="lg" color="primary" />
        ) : (
          <div className=" max-w-screen w-full h-full  space-y-4 p-4">
            <Table
              currentPage="filhos"
              array={['ID', 'Nome', 'Status', 'Data de criação', 'E-mail', '']}
              ColsBody={6}
              data={marketplacesChilds}
              contentArray={[
                'id',
                'nome_fantasia',
                'status_estabelecimento_id',
                'created',

              ]}
            />
          </div>
        )}
      </>
    </div>
  )
}

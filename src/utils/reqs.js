import axios from 'axios'
import { toast } from 'sonner'
import Router from 'next/router'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export const getServerSideDate = async (setResData, token) => {
  try {
    const res = await axios.get(
      `https://api.zsystems.com.br/z1/marketplaces?status=ativo`,
      { headers: { Authorization: `Bearer ${token}` } },
    )

    setResData(res.data.marketplaces)
  } catch (error) {
    console.error(error)
  }
}
export const auth = async (...reqs) => {
  try {
    const res = await axios.post(`https://api.zsystems.com.br/z1/autenticar`, {
      token,
    })
    if (res.data.success === false) {
      toast.error('Sua sessão expirou faça login novamente')
      Router.push('/')
    } else if (res.data.success === true) {
      reqs.forEach((req) => req())
    }
  } catch (error) {
    console.error(error)
  }
}
export const getCrons = async (setCrons, token) => {
  const res = await axios.get(
    `https://api.zsystems.com.br/z1/crons/logs
      `,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  if (res.data.success === true) {
    setCrons(res.data.cronsLogs)
  } else {
    toast.error(res.data.error)
  }
}

import axios from 'axios'
import { toast } from 'sonner'

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

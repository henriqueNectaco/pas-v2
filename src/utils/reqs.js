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

    console.log()
  } else {
    toast.error(res.data.error)
  }
}

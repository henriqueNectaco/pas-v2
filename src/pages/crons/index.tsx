import Header from '../../components/Header/index'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getCrons } from '@/utils/reqs.js'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { Spinner } from '@nextui-org/react'
import { CardCron } from './items'
import Router from 'next/router'
import { formatarData } from '@/utils/dates'
import TableCrons from '@/components/table'
type CronProps = {
  slug: string
  id: string
  message: string
  start_date: Date
  cron: string
  interval: string
}
const Array = ['Cron', 'Scheduled', 'Mensagem', 'Data']
export default function Crons() {
  const [crons, setCrons] = useState<CronProps[] | undefined>([])

  const token = Cookies.get('token')

  const auth = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/z1/autenticar`,
        { token },
      )
      if (res.data.success === true) {
        getCrons(setCrons, token)
      } else {
        toast.error('Sua sessão expirou faça login novamente')
        Router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <div className="  max-w-screen w-full   text-black-500 ">
      <Header />
      <div className="lg:p-4  p-3  max-w-screen  space-y-2  flex flex-col">
        <>
          {!crons ? (
            <Spinner color="primary" size="lg" />
          ) : (
            <div className="   space-y-4  lg:grid-cols-1">
              <TableCrons
                array={['crons', 'Scheduled', 'Mensagem', 'Data']}
                data={crons}
                primeiro={'slug'}
                segundo={'interval'}
                terceiro={'message'}
                quarto={'start_date'}
                ColsBody={4}
              />
            </div>
          )}
        </>
      </div>
    </div>
  )
}
/*
<div className='bg-white text-center px-8 rounded-xl mx-8 my-4 shadow-md border-2 lg:grid lg:grid-cols-5 '>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Cron</p>
  <p className="">??</p>
</div>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Schesduled</p>
  <p className="">??</p>
</div>
<div className="p-4 col-span-2 ">
  <p className="font-bold">Mensagens</p>
  <p className="">??</p>
</div>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Data</p>
  <p className="">s</p>
</div>

</div> */

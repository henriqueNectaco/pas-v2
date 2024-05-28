import axios from 'axios'
import Header from '../../components/Header/index'
import React, { useEffect, useState } from 'react'
import { getLastDayOfMonth, formatDate } from '@/utils/dates'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import Router from 'next/router'
import DashComponent from '@/components/dash'
import { parseDate } from '@internationalized/date'
export default function DashBoard() {
  const todaydp = new Date()
  const lastDayOfMonth = getLastDayOfMonth(todaydp)

  const [value, setValue] = useState({
    start: parseDate(todaydp.toISOString().split('T')[0]), // Data atual
    end: parseDate(lastDayOfMonth.toISOString().split('T')[0]), // Último dia do mês
  })
  const [daysReprocessarSaldo, setDaysReprocessarSaldo] = useState<
    string | undefined
  >(undefined)

  const [numVendas, setNumVendas] = useState()
  const [servicesStatus, setServicesStatus] = useState()

  const [totalMKT, setTotalMKT] = useState(null)

  const [totalProcessedToday, setTotalProcessedToday] = useState(null)
  const [totalProcessedYesterday, setTotalProcessedYesterday] = useState(null)
  const [totalProcessedLastMonth, setTotalProcessedLastMonth] = useState(null)
  const [totalProcessedThirtyDaysBefore, setTotalProcessedThirtyDaysBefore] =
    useState(null)
  const [totalNotProcessedYesterday, setTotalNotProcessedYesterday] = useState()
  const [totalVendido, setTotalVendido] = useState()
  const [
    totalMarketplaceChildRegistredLastThiryDays,
    setTotalMarketplaceChildRegistredLastThirtyDays,
  ] = useState()
  const [
    totalEstabelecimentsChildRegistredLastThirtyDays,
    setTotalEstabelecimentsChildRegistredLastThirtyDays,
  ] = useState()
  const [totalNotProcessedToday, setTotalNotProcessedToday] = useState(null)
  const [
    totalMarketplaceChildRegistredPreviousMonth,
    setTotalMarketplaceChildRegistredPreviousMonth,
  ] = useState(null)

  const token = Cookies.get('token')

  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // O mês começa de 0 (janeiro é 0)
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const dataAtual = new Date()

  const ano = dataAtual.getFullYear()
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0') // Adiciona zero à esquerda se o mês for menor que 10
  const dia = String(dataAtual.getDate()).padStart(2, '0') // Adiciona zero à esquerda se o dia for menor que 10

  const today = `${ano}-${mes}-${dia}`
  // Exemplo de uso
  const currentDate = new Date() // Data atual
  const formattedDate = formatDateToYYYYMMDD(currentDate)

  const previousDate = new Date()
  previousDate.setDate(currentDate.getDate() - 30)
  const formattedPreviousDate = formatDateToYYYYMMDD(previousDate)

  const yesterday = new Date(dataAtual)
  yesterday.setDate(currentDate.getDate() - 1)
  const year = yesterday.getFullYear()
  const month = String(yesterday.getMonth() + 1).padStart(2, '0') // Adiciona zero à esquerda se o mês for menor que 10
  const day = String(yesterday.getDate()).padStart(2, '0') // Adiciona zero à esquerda se o dia for menor que 10
  const yesterdayFormatted = `${year}-${month}-${day}`

  const lastMonth = new Date(currentDate)
  lastMonth.setMonth(currentDate.getMonth() - 1)
  const yearlasmonth = lastMonth.getFullYear()
  const monthlastMonth = String(lastMonth.getMonth() + 1).padStart(2, '0') // Adiciona zero à esquerda se o mês for menor que 10
  const daylastMonth = String(lastMonth.getDate()).padStart(2, '0')
  const lastMonthFormatted = `${yearlasmonth}-${monthlastMonth}-${daylastMonth}`

  const previousMonth = new Date(lastMonth)
  previousMonth.setMonth(lastMonth.getMonth() - 1) // Define a data para o mês anterior ao mês anterior

  const yearPreviousMonth = previousMonth.getFullYear()
  const monthPreviousMonth = String(previousMonth.getMonth() + 1).padStart(
    2,
    '0',
  ) // Adiciona zero à esquerda se o mês for menor que 10
  const dayPreviousMonth = String(previousMonth.getDate()).padStart(2, '0') // Adiciona zero à esquerda se o dia for menor que 10

  const previousMonthFormatted = `${yearPreviousMonth}-${monthPreviousMonth}-${dayPreviousMonth}`
  const reprocessarSaldo = async () => {
    try {
      const res = await axios.get(
        `
      https://api.zsystems.com.br/z1/reprocessar-saldo/${idEstabelecimentoReprocessarSaldo}/${daysReprocessarSaldo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success === true) {
        toast.success('reprocessando')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const reprocessSale = async () => {
    try {
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/reprocessar-vendas/${idEstabelecimentoReprocessarVenda}/${formatDate(value.start.toDate())}/${formatDate(value.end.toDate())}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success === true) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fecthTotalMarketplaceChildResgistredPreviousMonth = async () => {
    try {
      const res = await axios.get(
        `
      https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=${previousMonthFormatted}&endDate=${lastMonthFormatted}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalMarketplaceChildRegistredPreviousMonth(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchTotanNotProcessedYesterday = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/sale/total-not-processed?startDate=${yesterdayFormatted}&endDate=${yesterdayFormatted}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalNotProcessedYesterday(res.data.totalNotProcessed)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchTotalNotProcessedToday = async () => {
    try {
      const res = await axios.get(
        `
https://pas-aps.up.railway.app/sale/total-not-processed?startDate=${today}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalNotProcessedToday(res.data.totalNotProcessed)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalEstabelecimentsChildRegistredLastThirtyDays = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/establishment/total-registered?startDate=${lastMonthFormatted}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalEstabelecimentsChildRegistredLastThirtyDays(
        res.data.totalRegistered,
      )
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalMarketplaceChildRegistredLastThirtyDays = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=${lastMonthFormatted}&endDate=${formattedDate}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalMarketplaceChildRegistredLastThirtyDays(
        res.data.totalMarketplaceChild,
      )
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalProcessedThirtyDaysLater = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/sale/total-processed?startDate=${previousMonthFormatted}&endDate=${lastMonthFormatted}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalProcessedThirtyDaysBefore(res.data.totalProcessed)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalProcessedLastThirtyDays = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/sale/total-processed?startDate=${lastMonthFormatted}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalProcessedLastMonth(res.data.totalProcessed)
    } catch (error) {
      console.error(error)
    }
  }

  const FetchTotalProcessedYesterday = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/sale/total-processed?startDate=${yesterdayFormatted}&endDate=${yesterdayFormatted}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setTotalProcessedYesterday(res.data.totalProcessed)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchsTotalProcessedToday = async () => {
    try {
      const res = await axios.get(
        `https://pas-aps.up.railway.app/sale/total-processed?startDate=${today}&endDate=${today}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setTotalProcessedToday(res.data.totalProcessed)
    } catch (error) {
      console.error(error)
    }
  }

  /*
      const fetchTotalChild = async () => {
        try {
          const res = await axios.get(`https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=&endDate=`, {
           
            //setAlgumacoisa(res.data) 
          })
        }
        catch (error) { console.error(error) }
      } 
  */
  const fetchDataServiceStatus = async () => {
    try {
      const response = await axios.get(
        'https://api.zsystems.com.br/z1/services-status',
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setServicesStatus(response.data.services)
    } catch (error) {
      console.error('Erro ao chamar a API:', error)
    }
  }
  const fechAmountData = async () => {
    try {
      const response = await axios.get(
        'https://api.zsystems.com.br/z1/indicadores',
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setTotalVendido(response.data.result.transacionadoHoje.valorTotal)
      setNumVendas(response.data.result.transacionadoHoje.quantidade)
    } catch (error) {
      console.error(error)
    }
  }

  const fechTotalMKT = async () => {
    try {
      const response = await axios.get(
        `https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=${formattedPreviousDate}&endDate=${formattedDate}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setTotalMKT(response.data)
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
        fecthTotalMarketplaceChildResgistredPreviousMonth()
        fetchDataServiceStatus()
        fechAmountData()
        fechTotalMKT()
        FetchTotalProcessedYesterday()
        fetchsTotalProcessedToday()
        fetchTotalProcessedLastThirtyDays()
        fetchTotalProcessedThirtyDaysLater()
        fetchTotalMarketplaceChildRegistredLastThirtyDays()
        fetchTotalEstabelecimentsChildRegistredLastThirtyDays()
        fetchTotalNotProcessedToday()
        fetchTotanNotProcessedYesterday()
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

  const [
    idEstabelecimentoReprocessarVenda,
    setIdEstabelecimentoReprocessarVenda,
  ] = useState<string | undefined>(undefined)

  const [
    idEstabelecimentoReprocessarSaldo,
    setIdEstabelecimentoReprocessarSaldo,
  ] = useState<string | undefined>(undefined)

  return (
    <div className=" h-screen max-w-screen flex flex-col items-center  ">
      <Header />
      <div className=" h-screen    w-full  max-w-screen flex flex-col items-center justify-start  lg:pt-10 ">
        <DashComponent
          setValue={setValue}
          value={value}
          processadosHoje={totalProcessedToday}
          processadosOntem={totalProcessedYesterday}
          servicesStatus={servicesStatus}
          processadosMesAtual={totalProcessedLastMonth}
          processadosMesAnterior={totalProcessedThirtyDaysBefore}
          naoProcessadosHoje={totalNotProcessedToday}
          naoProcessadosOntem={totalNotProcessedYesterday}
          totalVendido={totalVendido}
          marketplacesCadastradosUltimos30dias={
            totalMarketplaceChildRegistredLastThiryDays
          }
          vendas={numVendas}
          estabelecimentosFilhosRegistradosUltimos30dias={
            totalEstabelecimentsChildRegistredLastThirtyDays
          }
          inputDias={setDaysReprocessarSaldo}
          idEstabelecimentoReprocessarSaldo={
            setIdEstabelecimentoReprocessarSaldo
          }
          reprocessarSaldo={reprocessarSaldo}
          reprocessarVenda={reprocessSale} //
          idEstabelecimentoReprocessarVenda={
            setIdEstabelecimentoReprocessarVenda
          }
        />
      </div>
    </div>
  )
}

/*
 <>

        {!servicesStatus ? (<Spinner color='primary' size='lg' />) : (
          <>{
            servicesStatus.map((servicesStatus: any) => (<div>


              <p>{servicesStatus.service}</p>
              <p>{formatarData(servicesStatus.last_update)}</p>
              {servicesStatus.status ? (<>

                <FaThumbsUp color='green' size={50} /></>
              ) : (
                <TiThumbsUp color='red' fill='red' />
              )}



            </div>))
          }
          </>
        )}
      </>

*/

/*
 <div className='border-2 border-blue-400 w-full lg:h-screen flex  flex-col items-center justify-center  p-4 gap-2'>
      <div className=' h-2/4 lg:h-1/4 border-2 rounded-lg w-full flex flex-col  items-center  justify-center lg:justify-between '>
        <p>Reprocessar venda</p>
        <div className='border-2 w-full h-full flex  flex-col lg:flex-row lg:items-end items-center justify-between gap-2 p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[50vw] lg:w-[20vw]' />
          <div className='border-2 flex flex-col lg:flex-row items-center gap-1  w-3/4 lg:w-1/4'> De: <DatePicker variant='underlined' label={'teste'} />
            Até: <DatePicker variant='underlined' label={'teste'} />

          </div>
          <Button color='primary' variant='solid' className='' size='lg'>Enviar</Button>
        </div>

      </div>


      <div className='h-2/4 lg:h-1/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between p-4'>
        <p>Reprocessar saldo</p>
        <div className='border-2 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:items-end lg:justify-between gap-2 p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className=' w-[50vw] lg:w-[20vw]' />
          <div className='border-2  lg:w-2/4 flex flex-col items-center justify-center'>
            <Input variant='underlined' placeholder='Dias' size='sm' className='w-[50vw]  lg:w-[20vw]' />
          </div>
          <Button color='primary' variant='solid' className='' size='lg'>Enviar</Button>
        </div>

      </div>




    </div>
  
  
*/

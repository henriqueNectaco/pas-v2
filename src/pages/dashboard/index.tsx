import axios from 'axios'
import Header from '../../components/Header/index'
import React, { useEffect, useState } from 'react'
import { getLastDayOfMonth, formatDate, today, yesterday } from '@/utils/dates'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import Router from 'next/router'
import DashComponent from '@/components/dasboard/dashComponent'
import { parseDate } from '@internationalized/date'
import { typeDataDashboard, typeServices } from '@/types/dashboard'
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
  const [data, setData] = useState<typeDataDashboard>({
    totalProcessadoHoje: 0,
    totalProcessadoOntem: 0,
    totalProcessadoMesAnterior: 0,
    totalProcessadoMesAtual: 0,
    totalEstabelecimentosFilhosRegistradosUltimosTrintaDias: 0,
    totalMarketplaceChildResgiteredLastThirtyDays: 0,
    numVendas: 0,
    processadosHoje: null,
    processadosOntem: null,
    processadosMesAtual: null,
    processadosMesAnterior: null,
    totalNaoProcessadoOntem: undefined,
    totalNaoProcessadoHoje: null,
    vendas: undefined,
    totalVendido: undefined,
    marketplacesCadastradosUltimos30dias: undefined,
    estabelecimentosFilhosRegistradosUltimos30dias: undefined,
  })
  const [servicesStatus, setServicesStatus] = useState<typeServices[]>([])
  const [isDisabledReprocessSales, setIsDisabledReprocessSales] = useState(true)
  const [isDisabledReprocessarSaldo, setIsDisabledReprocessarSaldo] =
    useState(true)
  const [isLoadingReprocessarSaldo, setIsLoadingReprocessarSaldo] =
    useState<boolean>(false)
  const [isLoadingReprocessarVenda, setIsLoadingReprocessarVenda] =
    useState<boolean>(false)

  const [
    idEstabelecimentoReprocessarVenda,
    setIdEstabelecimentoReprocessarVenda,
  ] = useState<string | undefined>(undefined)
  const [
    idEstabelecimentoReprocessarSaldo,
    setIdEstabelecimentoReprocessarSaldo,
  ] = useState<string | undefined>(undefined)
  const token = Cookies.get('token')

  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // O mês começa de 0 (janeiro é 0)
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Exemplo de uso
  const currentDate = new Date() // Data atual
  const formattedDate = formatDateToYYYYMMDD(currentDate)

  const previousDate = new Date()
  previousDate.setDate(currentDate.getDate() - 30)
  const formattedPreviousDate = formatDateToYYYYMMDD(previousDate)


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
    setIsLoadingReprocessarSaldo(true)
    try {
      setIsLoadingReprocessarSaldo(true)
      const res = await axios.get(
        `
      https://api.zsystems.com.br/z1/reprocessar-saldo/${idEstabelecimentoReprocessarSaldo}/${daysReprocessarSaldo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success === true) {
        toast.success('Reprocessando saldo')
        setIsLoadingReprocessarSaldo(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoadingReprocessarVenda(false)
    }
  }
  const reprocessSale = async () => {
    setIsLoadingReprocessarVenda(true)
    try {
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/reprocessar-vendas/${idEstabelecimentoReprocessarVenda}/${formatDate(value.start.toDate())}/${formatDate(value.end.toDate())}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success === true) {
        toast.success(res.data.message)
        setIsLoadingReprocessarVenda(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoadingReprocessarVenda(false)
    }
  }
  const fecthTotalMarketplaceChildResgistredPreviousMonth = async () => {
    try {
      const res = await axios.get(
        `
      https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=${previousMonthFormatted}&endDate=${lastMonthFormatted}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData(prevData => ({
        ...prevData, totalMarketPlaceRegistredPreviousMonth: res.data.totalMarketplaceChild
      }))

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
      setData(prevData => ({
        ...prevData, totalMarketplaceChildResgiteredLastThirtyDays: res.data.totalMarketplaceChild
      }))
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
      setData(prevData => ({
        ...prevData, totalNaoProcessadoOntem: res.data.totalNotProcessed
      }))
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
      setData(prevData => ({
        ...prevData, totalNaoProcessadoHoje: res.data.totalNotProcessed
      }))
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
      setData(prevData => ({
        ...prevData, totalEstabelecimentosFilhosRegistradosUltimosTrintaDias: res.data.totalRegistered
      }))
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
      setData(prevData => ({
        ...prevData, totalProcessadoMesAnterior: res.data.totalProcessed
      }))
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
      setData(prevData => ({
        ...prevData, totalProcessadoMesAtual: res.data.totalProcessed
      }))
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
      setData(prevData => ({ ...prevData, totalProcessadoOntem: res.data.totalProcessed }))
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
      setData(prevData => ({
        ...prevData, totalProcessadoHoje: res.data.totalProcessed
      }))
    } catch (error) {
      console.error(error)
    }
  }
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
      setData(prevData => ({
        ...prevData,
        totalVendido: response.data.result.transacionadoHoje.valorTotal,
        numVendas: response.data.result.transacionadoHoje.quantidade
      }))
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
    if (!idEstabelecimentoReprocessarVenda) {
      setIsDisabledReprocessSales(true)
    } else {
      setIsDisabledReprocessSales(false)
    }
    if (!idEstabelecimentoReprocessarSaldo || !daysReprocessarSaldo) {
      setIsDisabledReprocessarSaldo(true)
    } else {
      setIsDisabledReprocessarSaldo(false)
    }
  }, [
    idEstabelecimentoReprocessarVenda,
    idEstabelecimentoReprocessarSaldo,
    daysReprocessarSaldo,
  ])
  console.log(today)
  useEffect(() => {
    auth()
  }, [])
  useEffect(() => { console.log(data) }, [data])
  return (
    <div className=" h-screen max-w-screen flex flex-col items-center  ">
      <Header />
      <div className=" h-screen    w-full  max-w-screen flex flex-col items-center justify-start  lg:pt-10 ">
        <DashComponent
          data={data}
          isDisabledReprocessSale={isDisabledReprocessSales}
          isDisabledReprocessarSaldo={isDisabledReprocessarSaldo}
          isLoadingReprocessarVenda={isLoadingReprocessarVenda}
          isLoadingReprocessarSaldo={isLoadingReprocessarSaldo}
          setValue={setValue}
          value={value}
          servicesStatus={servicesStatus}
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




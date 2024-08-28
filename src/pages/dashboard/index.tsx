import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {
  today,
  yesterday,
  previousThirtyDays,
  thirtyDaysAgo,
  apiUrl,
  formatDateToYYYYMMDD,
  apiPas,
} from '@/lib/'
import { toast } from 'sonner'
import Router from 'next/router'
import DashComponent from '@/components/dasboard/dashComponent'
import { parseDate } from '@internationalized/date'
import { typeDataDashboard, typeServices } from '@/types/dashboard'
import { RangeValue, DateValue } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)

  const authRes = await axios.post(`${apiUrl}/autenticar`, { token })

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default function DashBoard() {
  const newDate = new Date()
  const token = Cookies.get('token')
  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: parseDate(newDate.toISOString().split('T')[0]), // Data atual
    end: parseDate(newDate.toISOString().split('T')[0]), // Último dia do mês
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

  const reprocessarSaldo = async () => {
    setIsLoadingReprocessarSaldo(true)
    try {
      setIsLoadingReprocessarSaldo(true)
      const res = await axios.get(
        `
      ${apiUrl}/reprocessar-saldo/${idEstabelecimentoReprocessarSaldo}/${daysReprocessarSaldo}`,
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
        `${apiUrl}/reprocessar-vendas/${idEstabelecimentoReprocessarVenda}/${formatDateToYYYYMMDD(value.start)}/${formatDateToYYYYMMDD(value.end)}`,
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
      ${apiPas}/establishment/total-marketplace-child?startDate=${previousThirtyDays}&endDate=${thirtyDaysAgo}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalMarketPlaceRegistredPreviousMonth: res.data.totalMarketplaceChild,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalMarketplaceChildRegistredLastThirtyDays = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/establishment/total-marketplace-child?startDate=${thirtyDaysAgo}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalMarketplaceChildResgiteredLastThirtyDays:
          res.data.totalMarketplaceChild,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  const fetchTotanNotProcessedYesterday = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/sale/total-not-processed?startDate=${yesterday}&endDate=${yesterday}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalNaoProcessadoOntem: res.data.totalNotProcessed,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  const fetchTotalNotProcessedToday = async () => {
    try {
      const res = await axios.get(
        `
${apiPas}/sale/total-not-processed?startDate=${today}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalNaoProcessadoHoje: res.data.totalNotProcessed,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalEstabelecimentsChildRegistredLastThirtyDays = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/establishment/total-registered?startDate=${thirtyDaysAgo}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalEstabelecimentosFilhosRegistradosUltimosTrintaDias:
          res.data.totalRegistered,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  const fetchTotalProcessedThirtyDaysLater = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/sale/total-processed?startDate=${previousThirtyDays}&endDate=${thirtyDaysAgo}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalProcessadoMesAnterior: res.data.totalProcessed,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTotalProcessedLastThirtyDays = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/sale/total-processed?startDate=${thirtyDaysAgo}&endDate=${today}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      setData((prevData) => ({
        ...prevData,
        totalProcessadoMesAtual: res.data.totalProcessed,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const FetchTotalProcessedYesterday = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/sale/total-processed?startDate=${yesterday}&endDate=${yesterday}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setData((prevData) => ({
        ...prevData,
        totalProcessadoOntem: res.data.totalProcessed,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchsTotalProcessedToday = async () => {
    try {
      const res = await axios.get(
        `${apiPas}/sale/total-processed?startDate=${today}&endDate=${today}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setData((prevData) => ({
        ...prevData,
        totalProcessadoHoje: res.data.totalProcessed,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  const fetchDataServiceStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/services-status`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setServicesStatus(response.data.services)
    } catch (error) {
      console.error('Erro ao chamar a API:', error)
    }
  }
  const fechAmountData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/indicadores`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData((prevData) => ({
        ...prevData,
        totalVendido: response.data.result.transacionadoHoje.valorTotal,
        numVendas: response.data.result.transacionadoHoje.quantidade,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const auth = async () => {
    try {
      const res = await axios.post(`${apiUrl}/autenticar`, { token })
      if (res.data.success === false) {
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
  useEffect(() => {
    auth()
    fecthTotalMarketplaceChildResgistredPreviousMonth()
    fetchDataServiceStatus()
    fechAmountData()
    FetchTotalProcessedYesterday()
    fetchsTotalProcessedToday()
    fetchTotalProcessedLastThirtyDays()
    fetchTotalProcessedThirtyDaysLater()
    fetchTotalMarketplaceChildRegistredLastThirtyDays()
    fetchTotalEstabelecimentsChildRegistredLastThirtyDays()
    fetchTotalNotProcessedToday()
    fetchTotanNotProcessedYesterday()
  }, [])

  return (
    <div className=" h-screen max-w-screen flex flex-col items-center    ">
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

import { DateValue, RangeValue } from '@nextui-org/react'
import { Dispatch, SetStateAction } from 'react'

export type PropsType = {
  isDisabledReprocessSale: boolean
  isDisabledReprocessarSaldo: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  servicesStatus: any | null
  processadosHoje: number | null
  processadosOntem: number | null
  processadosMesAtual: number | null
  processadosMesAnterior: number | null
  naoProcessadosOntem: number | undefined
  naoProcessadosHoje: number | null
  vendas: number | undefined
  totalVendido: number | undefined
  marketplacesCadastradosUltimos30dias: number | undefined
  estabelecimentosFilhosRegistradosUltimos30dias: number | undefined
  idEstabelecimento: () => void
  idEstabelecimentoReprocessarSaldo: Dispatch<
    SetStateAction<string | undefined>
  >
  reprocessarSaldo: () => void
  inputDias: Dispatch<SetStateAction<string | undefined>>
  idEstabelecimentoReprocessarVenda: Dispatch<
    SetStateAction<string | undefined>
  >
  reprocessarVenda: () => void


  value: RangeValue<DateValue> | null | undefined
  isLoadingReprocessarSaldo: boolean
  isLoadingReprocessarVenda: boolean
}

export type typeServices = {
  last_update: Date
  id: string
  service: string
  status: boolean
}
export type datePickerProps = {
  value: RangeValue<DateValue> | null | undefined
  variant: 'flat' | 'bordered' | 'faded' | 'underlined' | undefined
  setValue: (value: RangeValue<DateValue>) => void
}

export type TypePropsDashComponent = {
  reprocessarSaldo: () => void
  setValue: (value: RangeValue<DateValue>) => void
  reprocessarVenda: () => void
  idEstabelecimentoReprocessarSaldo: Dispatch<
    SetStateAction<string | undefined>
  >
  idEstabelecimentoReprocessarVenda: Dispatch<
    SetStateAction<string | undefined>
  >
  inputDias: Dispatch<SetStateAction<string | undefined>>
  servicesStatus: typeServices[]
  isDisabledReprocessSale: boolean
  isLoadingReprocessarVenda: boolean
  isLoadingReprocessarSaldo: boolean
  isDisabledReprocessarSaldo: boolean
  value: RangeValue<DateValue> | null | undefined
  data: {
    totalProcessadoHoje: number
    totalProcessadoOntem: number
    totalProcessadoMesAnterior: number
    totalProcessadoMesAtual: number
    totalEstabelecimentosFilhosRegistradosUltimosTrintaDias: number
    totalMarketplaceChildResgiteredLastThirtyDays: number
    numVendas: number
    processadosHoje: number | null
    processadosOntem: number | null
    processadosMesAtual: number | null
    processadosMesAnterior: number | null
    totalNaoProcessadoOntem: number | undefined
    totalNaoProcessadoHoje: number | null
    vendas: number | undefined
    totalVendido: number | undefined
    marketplacesCadastradosUltimos30dias: number | undefined
    estabelecimentosFilhosRegistradosUltimos30dias: number | undefined
  }
}
export type typeDataDashboard = {

  totalProcessadoHoje: number
  totalProcessadoOntem: number
  totalProcessadoMesAnterior: number
  totalProcessadoMesAtual: number
  totalEstabelecimentosFilhosRegistradosUltimosTrintaDias: number
  totalMarketplaceChildResgiteredLastThirtyDays: number
  numVendas: number
  processadosHoje: number | null
  processadosOntem: number | null
  processadosMesAtual: number | null
  processadosMesAnterior: number | null
  totalNaoProcessadoOntem: number | undefined
  totalNaoProcessadoHoje: number | null
  vendas: number | undefined
  totalVendido: number | undefined
  marketplacesCadastradosUltimos30dias: number | undefined
  estabelecimentosFilhosRegistradosUltimos30dias: number | undefined
}
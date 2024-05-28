import React, {
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  ChangeEvent,
} from 'react'
export type PropsType = {
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
  idEstabelecimento: ChangeEventHandler<HTMLInputElement>
  idEstabelecimentoInputFormTwo: Dispatch<SetStateAction<ChangeEvent>>
  reprocessarSaldo: () => void
  inputDias: Dispatch<SetStateAction<string>>
  reprocessarVenda: () => void
  value: Date
  setValue: () => void
}

export type typeServices = {
  last_update: Date
  id: string
  service: string
  status: boolean
}
export type datePickerProps = {
  value: Date
  setValue: () => void
}

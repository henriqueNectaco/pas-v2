import { Dispatch, SetStateAction } from 'react'



type EstabelecimentoType = {
  razao_social: string
  marketplace: {
    nome: string
  }
}
type typePagamentos = {
  valor_recebido: number
  data_recebimento: Date
  valor: number
  taxa: number
  markup: null | number
}
export type typeResponseData = {
  pagamentos: Array<typePagamentos>
  pedidos_splits: Array<object>
  parcelas: number
  id: string
  valor_bruto: number
  valor_liquido: number
  estabelecimento: EstabelecimentoType
  status_pedido: {
    titulo: string
  }
}

export interface ZoopTransaction {
  created_at: Date;
  payment_method: {
    card_brand: string;
  };
  payment_type: string;
  // 
}
export interface typePagament {
  status_pagamento_id: string
}
export type FormVendasTypes = {
  onSubmit: () => void
  Isloading: boolean
  setInputIdDaVenda: Dispatch<SetStateAction<string | undefined>>
  vendaId: string | undefined
  handleSearch: () => void
  handleCleanInput: () => void
}

export type splitsProps = { splits: Any | Array<string> }

export type splits = {
  id: string
  valor: number
  tipo_split: number
  estabelecimento: {
    nome_fantasia: string
  }
}

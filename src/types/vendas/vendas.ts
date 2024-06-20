import { Dispatch, SetStateAction } from 'react'
export interface Pedido {
  id: string
  status_pedido: {
    titulo: string
  }
  pedidos_splits: Array<object>
  estabelecimento: {
    razao_social: string
    marketplace: {
      nome: string
    }
  }
  valor_bruto: number
  valor_liquido: number
  pagamentos: [
    {
      taxa: number
      markup: number
      data_recebimento: string
      valor_recebido: number
      valor: number
      // Outras propriedades se necessário0,,,,,,,,,,,,,,,,,,
    },
  ]
  parcelas: number
  // Outras propriedades se necessário
}

export interface ZoopTransaction {
  created_at: Date
  payment_method: {
    card_brand: string
    // Outras propriedades se necessário
  }
  payment_type: string
  // Outras propriedades se necessário
}
export interface typePagament {
  status_pagamento_id: string
}
export type FormVendasTypes = {
  Isloading: boolean
  setInputIdDaVenda: Dispatch<SetStateAction<string | undefined>>
  vendaId: string | undefined
  handleSearch: () => void
  handleCleanInput: () => void
}

import { Dispatch, SetStateAction } from 'react'
interface pagamento {
  taxa: number
  markup: number
  data_recebimento: string
  valor_recebido: number
  valor: number
}
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
  pagamentos: undefined | pagamento[]
  parcelas: number
  // Outras propriedades se necessário
}

export interface ZoopTransaction {
  created_at: Date; // A data é geralmente uma string no formato ISO
  payment_method: {
    card_brand: string;
    // Outras propriedades se necessário
  };
  payment_type: string;
  // Outras propriedades se necessário
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

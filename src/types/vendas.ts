import { Dispatch, SetStateAction } from 'react'
import { z } from 'zod'
export const FormschemaCadastroMarketplace = z.object({
  nome: z.string().min(1, { message: 'Campo obrigatório' }),
  dominio: z.string().min(1, { message: 'URL inválida' }),
  website: z.string().url({ message: 'URL inválida' }),
  sellerId: z.string().min(1, { message: 'Campo obrigatório' }),
  zpk: z.string().min(1, { message: 'Campo obrigatório' }),
  cobrancaPorTransacao: z.boolean().optional(),
  carne: z.boolean().optional(),
  taxaAdministrativa: z.boolean().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor hexadecimal inválida"),
  zoopMarketplaceId: z.string().min(1, { message: 'Campo obrigatório' }),
  cobrancaValor: z.number().min(1, { message: 'Deve ser maior que zero' }),
  cobrancaEmail: z.string().email({ message: 'Campo obrigatório' })

})



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

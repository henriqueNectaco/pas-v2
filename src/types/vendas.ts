export interface Pedido {
  id: string
  status_pedido: {
    titulo: string
  }
  estabelecimento: {
    razao_social: string
    marketplace: {
      nome: string
    }
  }
  valor_bruto: number
  valor_liquido: number
  pagamentos: {
    taxa: number
    markup: number
    data_recebimento: string
    valor_recebido: number
    valor: number
    // Outras propriedades se necessário0,,,,,,,,,,,,,,,,,,
  }[]
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

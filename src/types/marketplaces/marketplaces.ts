import { z } from "zod"

export type propsFilterEstabeleciment = {
  limparFiltro: () => void
  filtrar: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  data: {
    id_estabelecimento: number
    nome_fantasia: string
    identificacao_fatura: string
  }


}
z
export type typeFilePond = {

  titulo: string


}
export type typeProps = {
  data: {
    nome: string
    zoopMarketplaceId: string
    dominio: string
    sellerId: string
    website: string
    zpk: string
  }
  isLoading: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export type AdicionarSSlsTypes = {
  data: {
    dominio: string
    nome: string
    pki: any
  }

}
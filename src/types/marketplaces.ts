import { RangeValue, DateValue } from "@nextui-org/react"


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
export type ModalTypes = {
  onChangeTaxTransaction: (e: React.ChangeEvent<HTMLInputElement>) => void
  useTaxForTransaction: boolean
  useDropdownChangeParents: boolean
  useDatePicker: boolean
  onClick: () => void
  onOpenChange: () => void
  isOpen: boolean
  action: string
  setValue: (value: RangeValue<DateValue>) => void
  value: RangeValue<DateValue> | null | undefined
  MarketplacesArray?: null | Array<string>

}
export type StepperTypes = {
  stepsData: Array
  activeStep: number
}
export type typeStep = {
  label: string
  active: boolean
}
//cadastro

export type typeFilePond = {
  name: string
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
  activeStep: number
  stepsData: { label: string; active: boolean; }[]
  handlePrevStep: () => void
  onClickNext: () => void
}


export type AdicionarSSlsTypes = {
  data: {
    dominio: string
    nome: string
    pki: any
  }

}
import { RangeValue, DateValue } from "@nextui-org/react"
import { Dispatch, SetStateAction } from "react"


export type propsFilterEstabeleciment = {
  limparFiltro: () => void
  filtrar: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  data: {
    id_estabelecimento: string | undefined
    nome_fantasia: string
    identificacao_fatura: string
  }
}

export type objectMarketplace = {
  id: number
  nome_fantasia: string
}

export type ModalTypes = {

  setId: Dispatch<
    SetStateAction<string | undefined>
  >
  MarketplacesArray?: Array<objectMarketplace>
  modalProps: {
    useDatePicker: boolean,
    useDesativar: boolean,
    useTaxForTransaction: boolean,
    useDropdownChangeParents: boolean
    action: string
  }

  onChangeTaxTransaction: (e: React.ChangeEvent<HTMLInputElement>) => void
  useDropdownChangeParents: boolean
  onClick: () => void
  onOpenChange: () => void
  isOpen: boolean
  action: string
  setValue: (value: RangeValue<DateValue>) => void
  value: RangeValue<DateValue> | null | undefined


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
  setFilesLogo: any
  setFilesFavIcon: any
  setFilesLoader: any
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
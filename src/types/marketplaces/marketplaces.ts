import { RangeValue, DateValue } from "@nextui-org/react"
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
export type ModalTypes = {

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
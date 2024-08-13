import { RangeValue, DateValue } from "@nextui-org/react"
import { Dispatch, Key, SetStateAction } from "react"
import { z } from "zod";


export const FormSchemaCadastroMarketplaceFilho = z.object({
  dominio: z.string().min(1, { message: 'URL inválida' }),
  website: z.string().min(1, { message: 'URL inválida' }),
  nome: z.string().min(1, { message: 'Campo obrigatório' }),
  cor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor hexadecimal inválida"),
})


export const FormschemaCadastroMarketplace = z.object({
  nome: z.string().min(1, { message: 'Campo obrigatório' }),
  dominio: z.string().min(1, { message: 'URL inválida' }),
  website: z.string().url({ message: 'URL inválida' }),
  sellerId: z.string().min(1, { message: 'Campo obrigatório' }),
  zpk: z.string().min(1, { message: 'Campo obrigatório' }),
  cobrancaPorTransacao: z.boolean().optional(),
  cobrancaValor: z.string().optional().transform(val => val ? Number(val) : undefined),
  cobrancaEmail: z.string().email().optional(),
  carne: z.boolean().optional(),
  taxaAdministrativa: z.boolean().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor hexadecimal inválida").optional(),
  zoopMarketplaceId: z.string().min(1, { message: 'Campo obrigatório' }),

  // Adicionando campo de arquivo
  logo: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 5MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Somente arquivos JPEG ou PNG são permitidos",
    }).optional(),
  loader: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 5MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Somente arquivos JPEG ou PNG são permitidos",
    }).optional(),
  favIcon: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 5MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Somente arquivos JPEG ou PNG são permitidos",
    }).optional(),
}).strict();

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
export type modalObject = {
  useDatePicker?: boolean,
  useDesativar?: boolean,
  useTaxForTransaction?: boolean,
  useDropdownChangeParents?: boolean,
  action: string
}
export type ModalTypes = {
  setId?: Dispatch<SetStateAction<string | undefined | Key>>
  MarketplacesArray?: Array<objectMarketplace>
  modalProps: modalObject

  onChangeTaxTransaction?: (e: React.ChangeEvent<HTMLInputElement>) => void
  useDropdownChangeParents?: boolean
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

export type typePropsCadastroMarketplace = {
  setFilesLogo: any
  setFilesFavIcon: any
  setFilesLoader: any
  data: {
    nome: string
    zoopMarketplaceId: string
    dominio: string
    mainSellerId: string
    website: string
    zpk: string
    cobrancaPorTransacao: boolean
    cobrancaValor: number
    cobrancaEmail: string

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
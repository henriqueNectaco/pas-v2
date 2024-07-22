import { format, subDays } from "date-fns"
import { toast } from "sonner"

export const responseDataResponse = (toastStringError: string, resData: any, toastStringSucces?: string) => {
  if (resData === false) {
    toast.warning(toastStringError)
  } else if (resData === true) {
    toast.success(toastStringSucces)
  }
}

const newDate = new Date()

export const today = format(newDate, 'yyyy-MM-dd')

// Corrigir a subtração de dias
const yesterdayGet = subDays(newDate, 1)

// Remover o espaço extra antes do formato da data
export const yesterday = format(yesterdayGet, 'yyyy-MM-dd')

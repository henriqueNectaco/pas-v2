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

const yesterdayGet = subDays(newDate, 1)
export const yesterday = format(yesterdayGet, 'yyyy-MM-dd')


const thirtyDaysAgoGet = subDays(newDate, 30)
export const thirtyDaysAgo = format(thirtyDaysAgoGet, 'yyyy-MM-dd')

const previousThirtyDaysGet = subDays(newDate, 60)
export const previousThirtyDays = format(previousThirtyDaysGet, 'yyyy-MM-dd') 
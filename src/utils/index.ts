import { toast } from "sonner"

export const responseDataResponse = (toastStringError: string, resData: any, toastStringSucces?: string) => {
  if (resData === false) {
    toast.warning(toastStringError)
  } else if (resData === true) {
    toast.success(toastStringSucces)
  }
}
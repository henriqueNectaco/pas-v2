import { toast } from "sonner";

export const statusPayment = (statusPaymentId: number) => {
  switch (statusPaymentId) {
    case 1:
      return 'Pendente';
    case 2:
      return 'Pago';
    case 3:
      return 'Cancelado';
    case 4:
      return 'Estornado';
    case 5:
      return 'Pré Autorizado';
    default:
      return '-'
  }
}
export const statusMarketplacesChilds = (status: number) => {
  switch (status) {
    case 2: return "Aprovado";
    case 4: return "Desabilitado";
  }
}


export const nullVerifiyer = (dataString: string) => {

  switch (dataString) {
    case '': return "Unknown"
    default: return dataString
  }
}

export const responseDataResponse = (toastStringError: string, resData: any, toastStringSucces?: string) => {
  if (resData === false) {
    toast.warning(toastStringError)
  } else if (resData === true) {
    toast.success(toastStringSucces)
  }
}
import { format, subDays } from 'date-fns'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'
import axios from 'axios'
export const apiUrlSetup = process.env.NEXT_PUBLIC_API_SETUP
export const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const localUrl = process.env.NEXT_PUBLIC_LOCAL
export const apiPas = process.env.NEXT_PUBLIC_API_PAS
const newDate = new Date()

export const token = Cookies.get('token')

export const today = format(newDate, 'yyyy-MM-dd')

const yesterdayGet = subDays(newDate, 1)
export const yesterday = format(yesterdayGet, 'yyyy-MM-dd')

const thirtyDaysAgoGet = subDays(newDate, 30)
export const thirtyDaysAgo = format(thirtyDaysAgoGet, 'yyyy-MM-dd')

const previousThirtyDaysGet = subDays(newDate, 60)
export const previousThirtyDays = format(previousThirtyDaysGet, 'yyyy-MM-dd')

interface DateObject {
  day: number
  month: number
  year: number
  era: string
  // [key: string]: any // permite outras propriedades arbitrárias
}

// const dateObject: DateObject = {
//   day: 8,
//   era: 'AD',
//   month: 8,
//   year: 2024,
//   // outras propriedades, se houver
// }

export function formatDateToYYYYMMDD(dateObj: DateObject): string {
  const year = dateObj.year
  const month = String(dateObj.month).padStart(2, '0')
  const day = String(dateObj.day).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const statusPayment = (statusPaymentId: number | string) => {
  switch (statusPaymentId) {
    case '1':
      return 'Pendente'
    case '2':
      return 'Pago'
    case '3':
      return 'Cancelado'
    case '4':
      return 'Estornado'
    case '5':
      return 'Pré Autorizado'
    case 1:
      return 'Pendente'
    case 2:
      return 'Pago'
    case 3:
      return 'Cancelado'
    case 4:
      return 'Estornado'
    case 5:
      return 'Pré Autorizado'
    default:
      return '-'
  }
}
export const statusMarketplacesChilds = (status: number | undefined) => {
  switch (status) {
    case 2:
      return 'Aprovado'
    case 4:
      return 'Desabilitado'
    case 1:
      return 'Aguardando Aprovação'
  }
}

export const nullVerifiyer = (dataString: string | undefined) => {
  switch (dataString) {
    case '':
      return 'Unknown'
    default:
      return dataString
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)

  const authRes = await axios.post(`${apiUrl}/autenticar`, { token })

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: { dados: authRes.data.usuario } }
}
interface DateObjectTimer {
  calendar: {
    identifier: string
  }
  day: number
  era: string
  hour: number
  millisecond: number
  minute: number
  month: number
  offset: number
  second: number
  timeZone: string
  year: number
  // Outros campos opcionais
}
interface DateValue {
  // Adapte este tipo ao que você está realmente usando
  year: number
  month: number
  day: number
  hour?: number
  minute?: number
  second?: number
}

export function convertToDateObjectTimer(
  dateValue: DateValue,
): DateObjectTimer {
  return {
    calendar: {
      identifier: 'gregorian', // Ou o identificador apropriado
    },
    day: dateValue.day,
    era: 'AD', // Ou o valor apropriado
    hour: dateValue.hour ?? 0,
    millisecond: 0, // Ou o valor apropriado
    minute: dateValue.minute ?? 0,
    month: dateValue.month,
    offset: 0, // Ou o valor apropriado
    second: dateValue.second ?? 0,
    timeZone: 'UTC', // Ou o valor apropriado
    year: dateValue.year,
  }
}
export function formatDateRangeTimer(dateObj: DateObjectTimer) {
  const year = dateObj.year
  const month = String(dateObj.month).padStart(2, '0') // mês em formato 'mm'
  const day = String(dateObj.day).padStart(2, '0') // dia em formato 'dd'
  const hour = String(dateObj.hour).padStart(2, '0') // hora em formato 'hh'
  const minute = String(dateObj.minute).padStart(2, '0') // minutos em formato 'mm'

  return `${year}-${month}-${day} ${hour}:${minute}`
}

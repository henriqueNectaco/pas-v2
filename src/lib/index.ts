import { format, subDays } from "date-fns"
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next';
import nextCookies from 'next-cookies';
import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL
export const localUrl = process.env.NEXT_PUBLIC_LOCAL


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
  day: number;
  month: number;
  year: number;
  era: string;
  [key: string]: any; // permite outras propriedades arbitrárias
}

const dateObject: DateObject = {
  day: 8,
  era: "AD",
  month: 8,
  year: 2024
  // outras propriedades, se houver
};

export function formatDateToYYYYMMDD(dateObj: DateObject): string {
  const year = dateObj.year;
  const month = String(dateObj.month).padStart(2, '0');
  const day = String(dateObj.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


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

export function arrayOfObjectsSum(arr: Array<object>, key: string) {
  if (!Array.isArray(arr)) {
    throw new Error('O parâmetro "arr" deve ser um array.');
  }

  return arr.reduce((sum, obj) => {
    // Convertendo o valor para número e garantindo que seja zero se não for um número válido
    const value = parseFloat(obj[key]) || 0;
    return sum + value;
  }, 0);
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context);

  const authRes = await axios.post(
    `${apiUrl}/autenticar`,
    { token }
  );

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { dados: authRes.data.usuario } };
};
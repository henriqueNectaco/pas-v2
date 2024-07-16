import { parseDate } from '@internationalized/date'
import { getLastDayOfMonth, format } from '@/utils/dates'
import ModalMine from '@/components/modal'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import nextCookies from 'next-cookies'
import {
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
} from '@nextui-org/react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/index'
import axios from 'axios'
import { getServerSideDate } from '@/utils/reqs.js'
import { CaretDown } from 'phosphor-react'
import { toast } from 'sonner'
import TableMarketPlaces from './table'


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nextCookies(context)

  const authRes = await axios.post(
    `https://api.zsystems.com.br/z1/autenticar`,
    { token }
  )

  if (authRes.data.success === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  const fetchMarketplacesData = await axios.get(`https://api.zsystems.com.br/z1/marketplaces?status=ativo`, { headers: { Authorization: `Bearer ${token}` }, })
  return { props: { data: fetchMarketplacesData.data.marketplaces } }
}




export default function Marketplace({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [value, setValue] = useState({
    start: parseDate('2024-04-01'), // Data inicial
    end: parseDate('2024-04-30'), // Último dia do mês
  })
  const [action, setAction] = useState('Reprocessar todas as vendas')
  const [date, setDate] = useState({
    startDate: format(value.start.toDate()),
    endDate: format(value.end.toDate())
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const token = Cookies.get('token')
  const router = useRouter()
  const [resData, setResData] = useState<Object>(data)
  const [state, setState] = useState('ativos')
  const handleReprocessAllSales = async () => {
    try {
      const res = await axios.post(`https://urltestepai`,
        { startDate: date.startDate, endDate: date.endDate },
        { headers: { Authorization: `Bearer ${token}` } },


      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleFuncoes = async () => {
    switch (action) {
      case 'Reprocessar todas as vendas':
        await handleReprocessAllSales()
        break;
      case 'Importar todas as vendas':
        () => alert('impotar todas as vendas !');
        break;
      default:
        console.log('outro');
        break;
    }
  };

  const fetchFilteredData = async () => {
    try {
      if (resData !== null) {
        setResData('')
      }
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplaces?status=${state}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setResData(res.data.marketplaces)
    } catch (error) {
      console.error(error)
    }
  }
  const auth = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/z1/autenticar`,
        { token },
      )
      if (res.data.success === true) {
        //        getServerSideDate(setResData, token)
      } else {
        toast.error('Sua sessão expirou faça login novamente')
        Router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    auth()
  }, [])

  return (
    <div className="  max-w-screen w-full h-screen  flex flex-col items-center bg-gray-200 ">
      <Header />
      <div className="w-full flex flex-col items-center  h-full lg:p-6 p-4 space-y-2 lg:space-y-4  mt-4">
        <div className=" w-full flex flex-col lg:grid lg:grid-cols-4 boder-2 gap-2  ">
          <div className=" flex flex-col lg:flex-row lg:col-span-2 gap-2 ">
            <Button
              fullWidth={true}
              radius="md"
              size="md"
              variant="solid"
              color="primary"
              onClick={onOpen}
            >
              Reprocessar todas as vendas
            </Button>
            <Button
              fullWidth={true}
              radius="md"
              size="md"
              variant="solid"
              color="primary"
              onClick={() => Router.push('/marketplaces/cadastrar')}
            >
              Novo Marketplace
            </Button>
            <Button
              fullWidth={true}
              radius="md"
              size="md"
              variant="solid"
              color="primary"
            >
              Importar todas as vendas
            </Button>
          </div>

          <div className="  lg:col-span-2 flex flex-col lg:flex-row justify-center items-center     lg:justify-end">
            <div className="col-span-1 lg:w-1/2  w-full flex flex-row gap-2 lg:gap-1  rounded-md">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className=""
                    size="md"
                    variant="shadow"
                    color="default"
                    fullWidth={true}
                  >
                    {state}
                    <CaretDown size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  onAction={(key) => {
                    setState(key)
                  }}
                  color="primary"
                  variant="solid"
                >
                  <DropdownItem key="todos">todos</DropdownItem>
                  <DropdownItem key="ativos">ativoss</DropdownItem>
                  <DropdownItem key="removido">desativados</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button size="md" onClick={fetchFilteredData} color="primary">
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        <>
          {!resData ? (
            <Spinner size="lg" color="primary" />
          ) : (
            <div className=" max-w-screen w-full h-full        ">
              <TableMarketPlaces marketplace={resData} />
            </div>
          )}
        </>
      </div>
      <ModalMine
        value={value}
        setValue={setValue}
        action={action}
        onClick={handleFuncoes}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

/*        
*/
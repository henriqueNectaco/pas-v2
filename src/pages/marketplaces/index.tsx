import { parseDate } from '@internationalized/date'
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
  DateValue,
  RangeValue,
} from '@nextui-org/react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import React, { Key, useEffect, useState } from 'react'
import axios from 'axios'
import { CaretDown } from 'phosphor-react'
import { toast } from 'sonner'
import TableMarketPlaces from './table'
import { formatDateToYYYYMMDD, localUrl, today } from '@/lib'

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

  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: parseDate(today),
    end: parseDate(today),
  })
  const [modalProps, setModalProps] = useState({
    useTaxForTransaction: false,
    action: 'Confirmar',
    useDesativar: false,
    useDropdownChangeParents: false,
    useDatePicker: false
  })

  const [date, setDate] = useState({
    startDate: formatDateToYYYYMMDD(value.start),
    endDate: formatDateToYYYYMMDD(value.end)
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const token = Cookies.get('token')
  const router = useRouter()
  const [resData, setResData] = useState<Array<object> | null>(data)
  const [statusMarketplace, setStatusMarketplace] = useState<Key | string>('ativos')
  const handleReprocessAllSales = async () => {
    try {//https://api.zsystems.com.br/marketplaces/reprocessar-pedidos
      const res = await axios.post(`${localUrl}/reprocessar-pedidos`,
        { startDate: date.startDate, endDate: date.endDate },
        // { headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.success === true) {
        toast.success('Adicionado a fila :)')
      } else { toast.error('Algo de inesperado aconteceu') }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImportAllSales = async () => {
    try {//https://api.zsystems.com.br/marketplaces/importar-pedidos
      const res = await axios.post(`${localUrl}/importar-pedidos`,
        { startDate: date.startDate, endDate: date.endDate },
        //{ headers: { Authorization: `Bearer ${token}` } },
      )
      if (res.data.success === true) {
        toast.success('Adicionado a fila ')
      } else { toast.error('Algo de inesperado aconteceu') }
    }

    catch (error) {
      console.error(error)
    }
  }

  const handleFuncoes = async () => {
    switch (modalProps.action) {
      case 'Reprocessar todas as vendas':
        await handleReprocessAllSales()
        break;
      case 'Importar todas as vendas':
        await handleImportAllSales()
        break;
      default:
        console.log('outro');
        break;
    }
  };

  const fetchFilteredData = async () => {
    try {
      if (resData !== null) {
        setResData(null)
      }
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplaces?status=${statusMarketplace}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setResData(res.data.marketplaces)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axios.post(
          `https://api.zsystems.com.br/z1/autenticar`,
          { token },
        )
        if (res.data.success === false) {
          toast.error('Sua sessão expirou faça login novamente')
          Router.push('/')
          //        getServerSideDate(setResData, token)
        }
      } catch (error) {
        console.error(error)
      }
    }

    auth()
  }, [])
  useEffect(() => {
    setDate({
      startDate: formatDateToYYYYMMDD(value.start)
      ,
      endDate: formatDateToYYYYMMDD(value.end)
    })
  }, [value])
  return (
    <div className={`max-w-screen w-full   flex flex-col items-center bg-gray-200 `}>

      <div className={`w-full flex flex-col items-center  ${resData === null ? 'h-screen' : 'h-full'}  lg:p-6 p-4 space-y-2 lg:space-y-4  mt-4`}>
        <div className=" w-full flex flex-col lg:grid lg:grid-cols-4 boder-2 gap-2  ">
          <div className=" flex flex-col lg:flex-row lg:col-span-2 gap-2 ">
            <Button
              fullWidth={true}
              radius="md"
              size="md"
              variant="solid"
              color="primary"
              onClick={() => {
                setModalProps(prev => ({
                  ...prev,
                  action: 'Reprocessar todas as vendas'
                }))
                onOpen()
              }}
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
              onClick={() => {
                setModalProps(prev => ({
                  ...prev,
                  action: 'Importar todas as vendas',
                  useDatePicker: true, useTaxForTransaction: false, useDesativar: false
                }))
                onOpen()
              }}
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
                    {statusMarketplace}
                    <CaretDown size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  onAction={(key) => {
                    setStatusMarketplace(key)
                  }}
                  color="primary"
                  variant="solid"
                >
                  <DropdownItem key="todos">todos</DropdownItem>
                  <DropdownItem key="ativos">ativos</DropdownItem>
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
            <div className=" max-w-screen w-full  bg-gray-200">
              <TableMarketPlaces marketplace={resData} />
            </div>
          )}
        </>
      </div>
      <ModalMine modalProps={modalProps}
        value={value}
        setValue={setValue}
        action={modalProps.action}
        onClick={handleFuncoes}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

/*        
*/
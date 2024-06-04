import Cookies from 'js-cookie'

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/index'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
} from '@nextui-org/react'

import axios from 'axios'
import TableTestes from './table'
import { getServerSideDate } from '@/utils/reqs.js'
import { CaretDown } from 'phosphor-react'
import { toast } from 'sonner'
import Router from 'next/router'

export default function Marketplace() {
  const token = Cookies.get('token')

  const [resData, setResData] = useState<Object>()
  const [state, setState] = useState('ativos')

  const fetchFilteredData = async () => {
    try {
      const res = await axios.get(
        `https://api.zsystems.com.br/z1/marketplaces?status=${state}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setResData(res.data.marketplaces)
      console.log('res com filtro', res.data)
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
        if (res.data.success === true) {
          getServerSideDate(setResData, token)
        } else {
          toast.error('Sua sessão expirou faça login novamente')
          Router.push('/')
        }
      } catch (error) {
        console.error(error)
      }
    }

    auth()
  }, [])

  return (
    <div className="  max-w-screen w-full flex flex-col items-center bg-gray-200 ">
      <Header />
      <div className="w-full flex flex-col items-center  h-full p-2 space-y-2 lg:space-y-4  mt-4">
        <div className=" w-full flex flex-col lg:grid lg:grid-cols-4 boder-2 gap-2">
          <div className=" flex flex-col lg:flex-row lg:col-span-2 gap-2">
            <Button
              fullWidth={true}
              radius="md"
              size="md"
              variant="solid"
              color="primary"
            >
              Reprocessar todas as vendas
            </Button>
            <Button
              fullWidth={true}
              radius="md"
              size="md"
              variant="solid"
              color="primary"
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
            <div className="col-span-1 lg:w-1/2  w-full flex flex-row gap-2 lg:gap-1">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className=""
                    size="md"
                    variant="flat"
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
            <div className=" max-w-screen w-full h-full       ">
              <TableTestes marketplace={resData} />
            </div>
          )}
        </>
      </div>
    </div>
  )
}

/*
   {resData.map((resData: ListProps) => (
              <ListMarketplaces
                id={resData.id}
                key={resData.id}
                mainECEmail={resData.mainECEmail}
                mainECId={resData.mainECId}
                mainECNomeFantasia={resData.mainECNomeFantasia}
              />
            ))}
            */

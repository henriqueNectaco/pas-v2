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
import ListMarketplaces from './listMarketplaces'
import axios from 'axios'

import { CaretDown } from 'phosphor-react'
import { toast } from 'sonner'
import Router from 'next/router'

type ListProps = {
  id: string
  mainECId: string
  mainECNomeFantasia: string
  mainECEmail: string
}

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
    const getServerSideDate = async () => {
      try {
        const res = await axios.get(
          `https://api.zsystems.com.br/z1/marketplaces?status=ativo`,
          { headers: { Authorization: `Bearer ${token}` } },
        )

        setResData(res.data.marketplaces)
        console.log('res.data sem filtro', res.data.marketplaces)
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
          getServerSideDate()
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
  useEffect(() => {
    console.log('resData useeffect', resData)
  }, [resData])
  console.log('state', state)
  return (
    <div className=" h-full max-w-screen w-full flex flex-col items-center bg-gray-100 ">
      <Header />
      <div className="w-full flex flex-col items-center    pl-4 pr-4 mt-4">
        <div className="  lg:pt-4 lg:pb-2 w-full    gap-2 flex flex-col lg:flex-row items-center  lg:items-start justify-start  ">
          <div className="lg:w-3/4 w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start boder-2 gap-2">
            <div className=" flex flex-col lg:flex-row lg:w-3/4 w-full">
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
          </div>
          <div className=" w-full lg:w-1/4 flex flex-col lg:flex-row justify-center   gap-2 lg:gap-4 lg:justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button className="" size="md" variant="solid" fullWidth={true}>
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
          <div className=" max-w-screen w-full h-full  space-y-4    p-4 ">
            {resData.map((resData: ListProps) => (
              <ListMarketplaces
                id={resData.id}
                key={resData.id}
                mainECEmail={resData.mainECEmail}
                mainECId={resData.mainECId}
                mainECNomeFantasia={resData.mainECNomeFantasia}
              />
            ))}
          </div>
        )}
      </>
    </div>
  )
}

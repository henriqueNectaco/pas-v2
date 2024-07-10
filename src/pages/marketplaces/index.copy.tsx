import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Header from '../../components/cadastroMarketplace/filepond/Header/index'
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

  const [resData, setResData] = useState<object>()
  const [state, setState] = useState('ativos')

  const handleCleanInput = () => {
    setState('')
  }

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
    <div className=" h-screen max-w-screen w-full flex flex-col items-center  ">
      <Header />
      <div className="w-full flex flex-col items-center    p-2 lg:p-4">
        <div className="   w-full  border-2 p-4  lg:p-6 gap-2 flex flex-col lg:flex-row items-center  lg:items-start justify-start  ">
          <Button
            className="lg:w-[20vw] w-3/4 "
            radius="md"
            size="md"
            variant="solid"
            color="primary"
          >
            Reprocessar todas as vendas
          </Button>
          <Button
            className=" lg:w-[20vw] w-3/4"
            radius="md"
            size="md"
            variant="solid"
            color="primary"
          >
            Novo Marketplace
          </Button>
          <Button
            className="lg:w-[20vw] w-3/4"
            radius="md"
            size="md"
            variant="solid"
            color="primary"
          >
            Importar todas as vendas
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button className="" size="md" variant="solid">
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
          <Button size="md" onClick={handleCleanInput} color="danger">
            Limpar
          </Button>
          <Button size="md" onClick={fetchFilteredData} color="primary">
            Filtrar
          </Button>
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

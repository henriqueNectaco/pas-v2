import Header from '../../components/Header/index'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from '@nextui-org/react'
import { CaretDown } from 'phosphor-react'
import ListMarketplaces from '../marketplaces/listMarketplaces'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Table from './table'
import TableTestes from './table'

type ListProps = {
  id: string
  mainECId: string
  mainECNomeFantasia: string
  mainECEmail: string
}

export default function mktteste() {
  const [state, setState] = useState()
const [resData,setResData]=useState()






const token = Cookies.get('token')
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
  useEffect(()=>{
    getServerSideDate()
  })
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

            <Button size="md"  color="primary">
              Filtrar
            </Button>
          </div>
        </div>
      </div>
      
       <TableTestes/>
      
    </div>
  )
}

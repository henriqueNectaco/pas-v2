import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { parseDate } from '@internationalized/date'
import { useRouter } from 'next/router'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { DotsThreeOutlineVertical } from 'phosphor-react'
import ModalMine from '@/components/modal'
import axios from 'axios'
import { getLastDayOfMonth, format } from '@/utils/dates'

type TypeProps = {
  id: number
  nomeFantasia: string
}
const token = Cookies.get('token')
export default function DropdownButton(props: TypeProps) {
  const [action, setAction] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const todaydp = new Date()
  const lastDayOfMonth = getLastDayOfMonth(todaydp)
  const [value, setValue] = useState({
    start: parseDate('2024-04-01'), // Data inicial
    end: parseDate('2024-04-30'), // Último dia do mês
  })
  const router = useRouter()
  const importarECs = async () => {
    try {
      await axios.post(
        `https://pas-aps.up.railway.app/marketplace/import-establishment`,
        {
          startDate: format(value.start.toDate()),
          endDate: format(value.end.toDate()),
          marketplaceId: props.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
    } catch (error) {
      console.error(error)
    }
  }
  const importarVendas = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/marketplaces/${props.id}/importar-pedidos`,
        {
          startDate: format(value.start.toDate()),
          endDate: format(value.end.toDate()),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
    } catch (error) {
      console.error(error)
    }
  }

  const reprocessarVendas = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/marketplaces/reprocessar-pedidos/${props.id}`,
        {
          startDate: format(value.start.toDate()),
          endDate: format(value.end.toDate()),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      console.log(value)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFuncoes = async () => {
    switch (action) {
      case 'Reprocessar Vendas':
        reprocessarVendas()
        break
      case 'Importar Vendas':
        importarVendas()
        break
      case `Importar EC's`:
        importarECs()
        break
      case 'Adicionar SSL':
      default:
        console.log('outro')
        break
    }
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            <DotsThreeOutlineVertical size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => {
            if (key === 'showmarketplaceschilds') {
              router.push(`/marketplaces/${props.id}/filhos`)
            } else if (key === 'showestabelecimentschilds') {
              router.push(`/marketplaces/${props.id}/estabelecimentos`)
            } else if (key === 'reprocessSales') {
              setAction('Reprocessar Vendas')
              // setMyFunction(() => async (onClose) => {
              // try {
              //   const res = await axios.post(
              //     `https://api.zsystems.com.br/marketplaces/reprocessar-pedidos/${props.id}`,
              //     {
              //       startDate: format(value.start.toDate()),
              //       endDate: format(value.end.toDate()),
              //     },
              //     { headers: { Authorization: `Bearer ${token}` } },
              //   )
              //   console.log(value)
              // } catch (error) {
              //   console.error(error)
              // }
              // onClose()
              // })
              onOpen()
            } else if (key === 'importEc') {
              onOpen()
              setAction(`Importar EC's`)
            } else if (key === 'importSales') {
              onOpen()
              setAction('Importar Vendas')
            } else if (key === 'addssl') {
              router.push(
                `/marketplaces/${props.id}/${props.nomeFantasia}/adicionar-ssl`,
              )
            } else if (key === 'cadastrarMarketplaceFilho') { router.push(`/marketplaces/${props.id}/cadastrar-filho`) }
          }}
          color="primary"
          variant="solid"
        >
          <DropdownItem key='cadastrarMarketplaceFilho'>
            Cadastrar Marketplace filho
          </DropdownItem>
          <DropdownItem key="showmarketplaceschilds">
            Visualizar Marketplaces filhos
          </DropdownItem>
          <DropdownItem key="showestabelecimentschilds">
            Visualizar Estabelecimentos filhos
          </DropdownItem>
          <DropdownItem key="addssl">Adicionar SSL</DropdownItem>
          <DropdownItem key="reprocessSales">Reprocessar Vendas</DropdownItem>
          <DropdownItem key="importEc">Importar EC&apos;s</DropdownItem>
          <DropdownItem key="taxfortransaction">
            Cobrança por transação
          </DropdownItem>
          <DropdownItem key="importSales">Importar Vendas</DropdownItem>
          <DropdownItem key="renewcache">Renovar Cache</DropdownItem>
          <DropdownItem key="turnOff">Desativar</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ModalMine
        action={action}
        onClick={handleFuncoes}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        value={value}
        setValue={setValue}
      />
    </>
  )
}

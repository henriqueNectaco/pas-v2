import React from 'react'
import { useRouter } from 'next/router'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import { DotsThreeOutlineVertical } from 'phosphor-react'
import DateRangePickerComponent from '@/components/rangedatepicker'
import Mteste from './modal'
type TypeProps = {
  id: number
}
export default function DropdownButton(props: TypeProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()
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
              onOpen()
            }
          }}
          color="primary"
          variant="solid"
        >
          <DropdownItem key={props.id}>
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
      <Mteste isOpen={isOpen} onClose={onclose} onOpenChange={onOpenChange} />
    </>
  )
}

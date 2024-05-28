import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { CaretDown, DotsThreeOutlineVertical } from 'phosphor-react'
export default function DropdownMenuSecond() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <DotsThreeOutlineVertical size={32} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Cadatrar Marketpssslace filho</DropdownItem>
        <DropdownItem key="copy">Visualizar Marketplaces filhos</DropdownItem>
        <DropdownItem key="show_estabeleciments_child">
          Visualizar Estabelecimentos filhos
        </DropdownItem>
        <DropdownItem key="add_ssl">Adicionar ssSSL</DropdownItem>
        <DropdownItem key="re_sales">Reprocessar vendas</DropdownItem>
        <DropdownItem key="import_ec">Importar EC's</DropdownItem>
        <DropdownItem key="tax_sale">Cobrança por transação</DropdownItem>
        <DropdownItem key="import_sale">Importar vendas</DropdownItem>
        <DropdownItem key="renovar_cache">Renovar Cache</DropdownItem>
        <DropdownItem key="baka">Desativar</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

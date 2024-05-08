import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { CaretDown, DotsThreeOutlineVertical } from 'phosphor-react'
export default function DropdownMenuFirst() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          Todos
          <CaretDown size={22} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="Ativos">Ativos</DropdownItem>
        <DropdownItem key="Desativados">Desativados</DropdownItem>
        <DropdownItem key="Todos">Todos</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

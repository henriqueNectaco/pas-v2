import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { DotsThreeOutlineVertical } from 'phosphor-react'

type ContentMarketplaceProps = {
  id: string
  mainECId: string
  mainECNomeFantasia: string
  mainECEmail: string
}

export default function ListMarketplaces(props: ContentMarketplaceProps) {
  return (
    <div
      key={props.id}
      className="w-full border-b border-sky-400 shadow-md  rounded-md    flex  flex-col   items-center justify-center lg:flex-row p-4 gap-2 bg-white"
    >
      <div className="w-1/4  flex flex-col items-center justify-center">
        <p>Id:</p>
        <p>{props.id}</p>
      </div>
      <div className="w-1/4  flex flex-col items-center justify-center">
        <p>ID EC:</p>
        <p>{props.mainECId}</p>
      </div>
      <div className="w-1/4  flex flex-col items-center justify-center">
        <p>Marketplace</p>
        <p>{props.mainECNomeFantasia}</p>
      </div>

      <div className="w-1/4  flex flex-col items-center justify-center">
        <p>Email:</p>
        <p>{props.mainECEmail}</p>
      </div>
      <div className="w-1/4  flex flex-col items-center justify-center">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <DotsThreeOutlineVertical size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            onAction={(key) => {
              alert(key)
            }}
            color="primary"
            variant="solid"
          >
            <DropdownItem key={[props.id, 'string']}>
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
      </div>
    </div>
  )
}

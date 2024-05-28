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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

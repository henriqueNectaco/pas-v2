import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input
} from '@nextui-org/react'
import { CaretDown } from 'phosphor-react'
import DateRangePickerComponent from '../rangedatepicker'
import { ModalTypes } from '@/types/marketplaces/marketplaces'

export default function ModalMine(props: ModalTypes) {
  return (
    <>
      <Modal
        className={`h-[35vh] ${props.useDropdownChangeParents === true && 'h-[30vh]'}  ${props.useTaxForTransaction === true && 'h-[90vh] lg:h-2/4'} max-w-[90vw] lg:max-w-[30vw]`}
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">
                Selecione um intervalo
              </ModalHeader>
              <ModalBody className={`flex flex-col items-center ${props.useDatePicker === true ? 'justify-center' : 'justify-end'}`}>
                {props.useDatePicker === true && (
                  <DateRangePickerComponent
                    variant="underlined"
                    value={props.value}
                    setValue={props.setValue}
                  />
                )}
                {props.useDropdownChangeParents === true && (
                  <div className="w-2/4 max-w-full">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="flat"
                          color="primary"
                          fullWidth={true}
                        >
                          Open Menu
                          <CaretDown size={18} />
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu
                        className="max-w-full max-h-56 overflow-auto"
                        variant="bordered"
                        aria-label="Action event example"
                        onAction={(key) => props.setId(key)}
                      >
                        {props.MarketplacesArray.map((marketplace: any) => (
                          <DropdownItem key={marketplace.id} className='max-w-[70vw]'>
                            {marketplace.nome_fantasia}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                )}

                {props.useTaxForTransaction === true && (
                  <div className='border h-full w-full flex flex-col items-center p-4 gap-2'>
                    <h1 className='font-semibold text-md'>Cobrança por transação</h1>
                    <div className='flex w-full flex-col lg:flex-row gap-4'>
                      <p>teste</p>
                      <p>teste</p>
                    </div>
                    <div className='w-full gap-4 flex flex-col lg:flex-row'>
                      <p>teste</p>
                      <p>teste</p>
                    </div>
                    <h1 className='font-semibold text-md'>Cadastrar cobrança</h1>
                    <div className='w-full flex flex-col items-center justify-center'>
                      <Input labelPlacement='inside' type='number' variant='underlined' label='Valor R$' />
                      <Input labelPlacement='inside' variant='underlined' label='E-mail de recebimento' />
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex flex-col lg:flex-row">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  fullWidth={true}
                >
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => props.onClick(onClose)}
                  fullWidth={true}
                >
                  {props.action}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

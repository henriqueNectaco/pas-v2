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
  Input,
  Spinner
} from '@nextui-org/react'
import { CaretDown } from 'phosphor-react'
import DateRangePickerComponent from '../rangedatepicker'
import { ModalTypes, objectMarketplace } from '@/types/marketplaces'
import { useState } from 'react'


export default function ModalMine(props: ModalTypes) {
  const [selected, setSelected] = useState<string>()
  return (
    <>
      <Modal
        className={`lg:h-[40vh]  lg:w-1/4 w-full ${props.modalProps?.useDatePicker === true && '  lg:h-1/4  h-2/5 w-full'} ${props.modalProps?.useDropdownChangeParents === true && 'lg:h-[20vh] '} ${props.modalProps?.useDesativar === true && 'lg:h-[20vh] lg:w-[20vw] '} ${props.modalProps?.useTaxForTransaction === true && 'h-[80vh] lg:h-[40vh]'} max-w-[90vw] `}
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">
                {props.modalProps?.useDatePicker === true ? 'Selecione um intervalo' : props.modalProps?.action}

              </ModalHeader>
              <ModalBody className={`flex flex-col items-center ${props.modalProps?.useDatePicker === true ? 'justify-center' : 'justify-end'}`}>
                {props.modalProps?.useDatePicker === true && (
                  <DateRangePickerComponent
                    variant="underlined"
                    value={props.value}
                    setValue={props.setValue}
                  />
                )}
                {props.modalProps?.useDropdownChangeParents === true && (
                  <div className="w-full max-w-full">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="flat"
                          color="primary"
                          fullWidth={true}
                        >

                          {selected ? (selected) : ('Selecione um markeplace')}
                          <CaretDown size={18} />
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu
                        className="max-w-full max-h-56 overflow-auto"
                        variant="bordered"
                        aria-label="Action event example"
                        onAction={(key) => {
                          props.setId(key)
                        }}
                      >
                        {props.MarketplacesArray ? (
                          props.MarketplacesArray.map((marketplace: objectMarketplace) => (
                            <DropdownItem
                              key={marketplace.id}
                              className='max-w-[70vw]'
                              onClick={() => setSelected(marketplace.nome_fantasia)}
                            >
                              {marketplace.nome_fantasia}
                            </DropdownItem>
                          ))
                        ) : (
                          <Spinner />
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                )}

                {props.modalProps?.useTaxForTransaction === true && (
                  <div className=' h-full w-full flex flex-col items-center p-4 gap-2'>

                    <div className='flex flex-col lg:flex-row w-full'>
                      <div className='flex w-full flex-col lg:flex-row gap-4'>
                        <p className='font-semibold text-md'>Valor</p>
                        <p>teste</p>
                      </div>
                      <div className='w-full gap-4 flex flex-col lg:flex-row'>
                        <p className='font-semibold text-md'>Email de Recebimento:</p>
                        <p>teste</p>
                      </div></div>

                    <div className='w-full flex flex-col items-center justify-center  h-full'>
                      <h1 className='font-semibold text-md'>Cadastrar cobrança</h1>
                      <Input labelPlacement='inside' onChange={props.onChangeTaxTransaction} name='amount' type='number' variant='underlined' label='Valor R$' />
                      <Input labelPlacement='inside' onChange={props.onChangeTaxTransaction} name='email' variant='underlined' label='E-mail de recebimento' />
                    </div>
                  </div>
                )}
                {props.modalProps?.useDesativar === true && (
                  <div className=' text-lg h-full flex items-center'>Desativar Marketplace?</div>
                )}
              </ModalBody>
              <ModalFooter className={`flex flex-col lg:flex-row`}>
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

                  {props.modalProps?.useDatePicker === true ? props.action : 'Confirmar'
                  }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

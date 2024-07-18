import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from '@nextui-org/react'
import { CaretDown } from 'phosphor-react'
import DateRangePickerComponent from '../rangedatepicker'
import { ModalTypes } from '@/types/marketplaces/marketplaces'

export default function ModalMine(props: ModalTypes) {
  return (
    <>
      <Modal
        className="h-[30vh]"
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">
                Selecione um intervalo
              </ModalHeader>
              <ModalBody className={`flex flex-col items-center   ${props.useDatePicker === true ? 'justify-center' : 'justify-end'} `}>
                {props.useDatePicker === true && (<DateRangePickerComponent
                  variant="underlined"
                  value={props.value}
                  setValue={props.setValue}
                />)}
                {props.useDropdownChangeParents === true && (<Dropdown >
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      color='primary'
                      fullWidth={true}
                    >
                      Open Menu
                      <CaretDown size={18} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant='bordered'
                    aria-label="Action event example"
                    onAction={(key) => alert(key)}
                  >

                    {props.MarketplacesArray.map((marketplace: any) => (
                      <DropdownItem key={marketplace.nome_fantasia}>{marketplace.nome_fantasia}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>)}
                {props.useTaxForTransaction === true && (
                  <div className='border'>
                    teste


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

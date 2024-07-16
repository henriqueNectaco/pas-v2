import {
  DateValue,
  RangeValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

import DateRangePickerComponent from '../rangedatepicker'
type typeProps = {
  onClick: () => void
  onOpenChange: () => void
  isOpen: boolean
  action: string
  setValue: (value: RangeValue<DateValue>) => void
  value: RangeValue<DateValue> | null | undefined
}
export default function ModalMine(props: typeProps) {
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
              <ModalBody className="flex flex-col items-center justify-center">
                <DateRangePickerComponent
                  variant="underlined"
                  value={props.value}
                  setValue={props.setValue}
                />
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

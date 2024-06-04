import DateRangePickerComponent from '@/components/rangedatepicker'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'
type typeProps = {
  onClose: any
  isOpen: any
  onOpenChange: any
}
export default function Mteste(props: typeProps) {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">
                Selecione um intervalo
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center lg:p-12">
                <DateRangePickerComponent
                  setValue={props.setValue}
                  value={props.value}
                />
              </ModalBody>
              <ModalFooter className="flex flex-row items-center justify-center">
                <Button color="danger" variant="light" onPress={props.onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    alert('confirmado')
                    props.onClose()
                  }}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

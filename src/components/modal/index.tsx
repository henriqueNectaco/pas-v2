

;import React from "react";
import Header from '../../components/Header/index'
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import {Input ,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";









export default function Modalll(){
    const router=useRouter()
    const LogOut =()=>{
    
    Cookies.remove('token'); // ou localStorage.removeItem('token');
    router.push('/');
    
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalPlacement, setModalPlacement] = React.useState("top");

    return(

<Modal 
        isOpen={isOpen} 
        placement={modalPlacement}
        onOpenChange={onOpenChange} 
      >
        <ModalContent className=" h-[25vh] border-2">
          {(onClose) => (
            <>
              <ModalHeader className=" border-2 h-[7vh]  flex flex-col items-center justify-start gap-1"><p className="text-yellow-400">Warning!</p></ModalHeader>
              <ModalBody className="border-2 border-red-500 h-[15vh] flex flex-col items-center justify-center ">
<p className="text-xl">Deseja Efetuar o LogOut?</p>
              </ModalBody>
              <ModalFooter className="flex flex-row items-center justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={LogOut}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}
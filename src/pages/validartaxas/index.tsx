;import React from "react";
import Header from '../../components/Header/index'
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import App from '@/components/Header/test';
import {Input ,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";


export default function ValidarTaxas() {

  const router=useRouter()
  const LogOut =()=>{
  
  Cookies.remove('token'); // ou localStorage.removeItem('token');
  router.push('/');
  
  }
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("top");
  return (
    <div className='h-screen w-screen flex flex-col items-center  '>
      <Header />
      <div className=' w-4/6 lg:w-2/6 flex flex-col items-center justify-center h-1/6 border-2 mt-8 lg:p-4'>
        <h1>Consultar Taxa</h1>
        <div className='flex flex-row items-center justify-center  w-full p-2'>
          <Input color='default' variant='underlined' className='w-2/4' size='sm' />
          <Button onClick={() => { alert('vai se fuder') }} size='md' color='primary' variant='solid'>Consultar</Button></div>
      </div>
      <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Open Modal</Button>
     
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
    </div>

    </div>
  )
}



/*

<RadioGroup
        label="Select modal placement"
        orientation="horizontal"
        value={top}
        
      >
        <Radio value="auto">auto</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="center">center</Radio>
        <Radio value="top-center">top-center</Radio>
        <Radio value="bottom-center">bottom-center</Radio>
      </RadioGroup>

*/
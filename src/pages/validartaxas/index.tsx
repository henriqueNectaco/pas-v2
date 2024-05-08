import React from 'react'
import Header from '../../components/Header/index'
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import App from '@/components/Header/test';
import {Input ,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";



export default function ValidarTaxas() {
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
    {
      key: "5",
      name: "William Howard",
      role: "Communsssssssssssssity Manager",
      status: "Vacation",
    }
  ];
  
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {key:'a',label:'asd'}
    
  ];
  const router=useRouter()
  const LogOut =()=>{
  
  Cookies.remove('token'); // ou localStorage.removeItem('token');
  router.push('/');
  
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalPlacement, setModalPlacement] = React.useState('top')
  return (
    <div className='max-w-screen h-screen w-full flex flex-col items-center  '>
      <Header />
   
      <div className="w-full h-full p-4 flex flex-col gap-2">
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


    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>


    


 





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

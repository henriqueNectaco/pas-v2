import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, useDisclosure } from "@nextui-org/react";
import {Input ,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  RadioGroup, Radio} from "@nextui-org/react";
import logo from '../../assets/logo.svg';
import Image from "next/image";
import { ArrowRight } from "phosphor-react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} =useDisclosure()
  const [modalPlacement, setModalPlacement] = React.useState("top");
  const menuItems = [
    "Dashboard",
    "Dashboard",
    "Vendas",
    "Marketplace",
    "Crons",
    "Validar taxas",
    "SSL's",
    

  ];
  const menuItemsHrf = [
    'dashboard',
    "Dashboard",
    'vendas',
    'marketplaces',
    'crons',
    'validartaxas',
    'ssls'
    

  ]
  const router=useRouter()
const LogOut =()=>{

Cookies.remove('token'); // ou localStorage.removeItem('token');
router.push('/');

}


  return (<div className="max-w-screen w-full">
    <Navbar className="p-6  border-2 border-black w-full flex flex-row items-start max-w-screen   bg-gradient-to-r from-cyan-500 to-blue-500  text-black "
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >

      <NavbarContent className="sm:hidden " justify="start">

        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

        <Image src={logo} alt='teste' />
      </NavbarContent>

      <NavbarContent className="  sm:hidden pr-3" justify="center">
        <NavbarBrand>

        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" border-2 border-red-400   w-full hidden sm:flex gap-4" justify="center ">
        <NavbarBrand>

          <Image src={logo} alt='teste' />

        </NavbarBrand>

        <NavbarItem>
          <Link color="foreground" href="/dashboard
        ">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="vendas" aria-current="page">
            Vendas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="marketplaces">
            Marketplace
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="crons">
            Crons
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="validartaxas">
            Validar Taxas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            SSL's
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='lg:ml-8 border-2 border-black  w-full' justify="end">

        <NavbarItem justify='end'>
          <Button  onClick={onOpen}   color='FFFF' href="#" className="button-no-border" variant="solid">
            <ArrowRight size={32} />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='border-2'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "foreground" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={`/${menuItemsHrf[index]}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    <>
<Modal 
        isOpen={isOpen} 
        placement={modalPlacement}
        onOpenChange={onOpenChange} 
      >
        <ModalContent className=" h-[25vh] border-2">
          {(onClose) => (
            <>
              <ModalHeader className="  border-2 h-[7vh]  flex flex-col items-center justify-start gap-1"><p className="text-yellow-400">Warning!</p></ModalHeader>
              <ModalBody className=" h-[15vh] flex flex-col items-center justify-center border-2">
<p className="text-xl">Deseja Efetuar o LogOut?</p>
              </ModalBody>
              <ModalFooter className=" flex flex-row items-center justify-evenly bg-blue-500  ">
                <Button size="md" variant="light"  onPress={onClose}>
                  Cancelar
                </Button>
                <Button  size="md" color="success" variant="solid" onPress={LogOut}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      
      </>
    </div>
  );
}
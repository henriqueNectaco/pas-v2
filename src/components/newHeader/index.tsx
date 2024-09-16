import React from 'react'
import Cookies from 'js-cookie'

import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
// import { Container } from './styles'
// import { FaBars, FaUserAlt } from 'react-icons/fa'
// import Sidebar from '../Sidebar'
import { SignOut, TextAlignJustify, Warning } from 'phosphor-react'
// import { LogOut } from 'lucide-react'
// import Link from 'next/link'
import { useRouter } from 'next/router'
type header = {
  closeSideBar: () => void
  showSiderbar: () => void
}

export default function NewHeader(props: header) {
  // const [sidebar, setSidebar] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()
  const LogOut = () => {
    Cookies.remove('token') // ou localStorage.removeItem('token');
    router.push('/')
  }

  return (
    <>
      <div
        className={`bg-blue-600 flex flex-row lg:grid lg:grid-cols-2 shadow-[0_0_7px_3px]  `}
      >
        <div className=" text-white  flex items-center p-6 lg:col-span-1 w-full">
          <TextAlignJustify
            size={40}
            onClick={props.showSiderbar}
            className="hover:cursor-pointer"
          />
        </div>
        {/* <div className="hidden col-span-3  lg:flex flex-row p-6 items-center gap-6 justify-center">
          <Link
            href={`/dashboard`}
            onClick={props.closeSideBar}
            className="text-lg text-white"
          >
            Dashboard
          </Link>
          <Link
            href={`/vendas`}
            onClick={props.closeSideBar}
            className="text-lg text-white"
          >
            Vendas
          </Link>
          <Link
            href={`/marketplaces`}
            onClick={props.closeSideBar}
            className="text-lg text-white"
          >
            Marketplaces
          </Link>
          <Link
            href={`/crons`}
            className="text-lg text-white"
            onClick={props.closeSideBar}
          >
            Crons
          </Link>
        </div> */}
        <div className=" flex col-span-1 items-center  justify-end  w-full  p-6">
          <SignOut
            color="white"
            size={32}
            className="hover:cursor-pointer"
            onClick={onOpen}
          />
          {/* <UserCircle color='white' size={32} className='hover:cursor-pointer' onClick={onOpen} /> */}
        </div>
      </div>
      {/* {sidebar && <Sidebar closeSidebar={closeSideBar} active={setSidebar} onClick={showSiderbar} />} */}

      <Modal
        isOpen={isOpen}
        //          placement={modalPlacement}
        placement="top"
        onOpenChange={onOpenChange}
        radius="sm"
      >
        <ModalContent className=" border-2 lg:w-1/4 w-2/3 md:w-2/4">
          {() => (
            <>
              <ModalBody className=" flex flex-row items-center justify-center  border-b border-black p-6">
                <Warning size={25} color="#e9ec41" />
                <p className="text-xl">Deseja efetuar o LogOut?</p>
              </ModalBody>
              <ModalFooter className="flex p-4 items-center justify-center">
                <Button
                  radius="sm"
                  fullWidth={true}
                  size="md"
                  color="primary"
                  variant="solid"
                  onPress={LogOut}
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
// <FaBars className='fixed text-white w-7.5 h-7.5 mt-8 ml-8 cursor-pointer' onClick={showSiderbar} />

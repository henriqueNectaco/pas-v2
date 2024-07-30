import React, { useState } from 'react'
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import { Container } from './styles'
import { FaBars, FaUserAlt } from 'react-icons/fa'
import Sidebar from '../Sidebar'
import { SignOut, TextAlignJustify, UserCircle } from 'phosphor-react'
import { LogOut } from 'lucide-react'

export default function NewHeader() {
  const [sidebar, setSidebar] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const showSiderbar = () => setSidebar(!sidebar)

  return (<>
    <div className={` flex bg-blue-600 shadow-[0_0_7px_3px] ${sidebar ? 'hidden' : 'block'}`}>
      <div className=' text-white w-1/2 flex items-center p-6'><TextAlignJustify size={40} onClick={showSiderbar} className='hover:cursor-pointer' /></div>

      <div className=' flex items-center w-1/2 justify-end p-6'>
        <SignOut color='white' size={32} className='hover:cursor-pointer' onClick={onOpen} />
        {/* <UserCircle color='white' size={32} className='hover:cursor-pointer' onClick={onOpen} /> */}
      </div>
    </div>
    {sidebar && <Sidebar active={setSidebar} />}
    <>
      <Modal
        isOpen={isOpen}
        //          placement={modalPlacement}
        placement='top'
        onOpenChange={onOpenChange}
        radius='md'
      >
        <ModalContent className=" border-2 lg:w-1/4 w-2/3 md:w-2/4">
          {(onClose) => (
            <>
              <ModalHeader className="  flex flex-col  p-4 items-start justify-center gap-1">
                <p className="text-yellow-400">LogOut</p>
              </ModalHeader>
              <ModalBody className=" flex flex-col items-center justify-center  border-b border-black p-6">
                <p className="text-xl">Deseja Efetuar o LogOut?</p>
              </ModalBody>
              <ModalFooter className="flex p-4 items-center justify-center">

                <Button
                  radius='sm'
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
  </>

  )
}
//<FaBars className='fixed text-white w-7.5 h-7.5 mt-8 ml-8 cursor-pointer' onClick={showSiderbar} />

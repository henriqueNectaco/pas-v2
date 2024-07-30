import React, { useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'
import { TextAlignJustify } from 'phosphor-react'

export default function NewHeader() {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  return (<>
    <div className={` flex bg-blue-600 shadow-[0_0_7px_3px] ${sidebar ? 'hidden' : 'block'}`}>
      <div className=' text-white w-1/2 flex items-center p-6'><TextAlignJustify size={45} onClick={showSiderbar} className='hover:cursor-pointer' /></div>


    </div>
    {sidebar && <Sidebar active={setSidebar} />}

  </>
  )
}
//<FaBars className='fixed text-white w-7.5 h-7.5 mt-8 ml-8 cursor-pointer' onClick={showSiderbar} />

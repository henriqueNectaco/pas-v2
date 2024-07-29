import React from 'react'
import { Container, Content } from './styles'
import {
  FaTimes,
  FaHome,
  FaEnvelope,
  FaRegSun,
  FaUserAlt,
  FaIdCardAlt,
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'
import { useRouter } from 'next/router'

const Sidebar = ({ active }) => {
  const router = useRouter();

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem Icon={FaHome} Text="Dashboard" onClick={() => router.push('/dashboard')} />
        <SidebarItem Icon={FaChartBar} Text="Vendas" onClick={() => router.push('/vendas')} />
        <SidebarItem Icon={FaUserAlt} Text="Marketplaces" onClick={() => router.push('/marketplaces')} />
        <SidebarItem Icon={FaUserAlt} Text="Crons" onClick={() => router.push('/crons')} />
      </Content>
    </Container>
  )
}

export default Sidebar

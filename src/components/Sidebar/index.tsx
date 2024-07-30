import React from 'react'
import { Container, Content } from './styles'
import {
  FaTimes,
  FaUserAlt, FaFolderOpen,
  FaChartBar, FaLaptopHouse, FaCartPlus
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
        <SidebarItem Icon={FaChartBar} Text="Dashboard" href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`} />
        <SidebarItem Icon={FaCartPlus} Text="Vendas" href={`${process.env.NEXT_PUBLIC_BASE_URL}/vendas`} />
        <SidebarItem Icon={FaLaptopHouse} Text="Marketplaces" href={`${process.env.NEXT_PUBLIC_BASE_URL}/marketplaces`} />
        <SidebarItem Icon={FaFolderOpen} Text="Crons" href={`${process.env.NEXT_PUBLIC_BASE_URL}/crons`} />
      </Content>
    </Container>
  )
}

export default Sidebar
//FaUserAlt
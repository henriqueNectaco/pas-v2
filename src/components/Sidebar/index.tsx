import React from 'react'
import { Container, Content } from './styles'
import {
  FaTimes,
  // FaUserAlt
  FaFolderOpen,
  FaChartBar,
  FaLaptopHouse,
  FaCartPlus,
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'

type SidebarProps = {
  active: boolean // Dispatch<SetStateAction<boolean>>
  onClick: () => void
  setActive?: (value: boolean) => void
  closeSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ active, onClick, closeSidebar }) => {
  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <SidebarItem
          onClick={onClick}
          Icon={FaChartBar}
          Text="Dashboard"
          href={`/dashboard`}
        />
        <SidebarItem
          onClick={onClick}
          Icon={FaCartPlus}
          Text="Vendas"
          href={`/vendas`}
        />
        <SidebarItem
          onClick={onClick}
          Icon={FaLaptopHouse}
          Text="Marketplaces"
          href={`/marketplaces`}
        />
        <SidebarItem
          onClick={onClick}
          Icon={FaFolderOpen}
          Text="Crons"
          href={`/crons`}
        />
      </Content>
    </Container>
  )
}

export default Sidebar
// FaUserAlt

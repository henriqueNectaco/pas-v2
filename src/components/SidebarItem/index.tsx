import React from 'react'
import { Container } from './styles'
import Link from 'next/link'
type SidebarItemProps = {
  onClick: () => void
  Text: string
  href: string
  Icon: any
}
const SidebarItem: React.FC<SidebarItemProps> = ({ onClick, Icon, Text, href }) => {
  return (
    <Link href={href || "#"} passHref onClick={onClick}>
      <Container >
        <Icon />
        {Text}
      </Container>
    </Link>
  )
}

export default SidebarItem

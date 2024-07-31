import React from 'react'
import { Container } from './styles'
import Link from 'next/link'

const SidebarItem = ({ onClick, Icon, Text, href }) => {
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

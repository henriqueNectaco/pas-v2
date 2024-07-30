import React from 'react'
import { Container } from './styles'
import Link from 'next/link'

const SidebarItem = ({ Icon, Text, href }) => {
  return (
    <Link href={href || "#"} passHref>
      <Container >
        <Icon />
        {Text}
      </Container>
    </Link>
  )
}

export default SidebarItem

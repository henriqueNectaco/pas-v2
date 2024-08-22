import React, { useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { typePropsDropDownMenuCache } from '@/types/components'

export default function DropDownMenuCache(props: typePropsDropDownMenuCache) {
  const [selected, setSelected] = useState('')
  return (
    <Dropdown shouldBlockScroll={false}>
      <DropdownTrigger>
        <Button fullWidth={true} variant="ghost" color="primary">
          {selected === '' ? props.title : selected}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        aria-label="Action event example"
        onAction={(key) => {
          const selectedKey = key as string
          props.setData((prev) => ({
            ...prev,
            [props.title]: key,
          }))
          setSelected(selectedKey)
        }}
      >
        {props.items.map((item) => (
          <DropdownItem key={item} className="" color="default">
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

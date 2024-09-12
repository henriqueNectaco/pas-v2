import React, { useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { typePropsDropDownMenuCache } from '@/types/components'
import { CaretDown } from 'phosphor-react'
export default function DropDownMenuCache(props: typePropsDropDownMenuCache) {
  const [selected, setSelected] = useState('')
  return (
    <Dropdown shouldBlockScroll={false}>
      <DropdownTrigger>
        <Button fullWidth={true} variant="bordered" color="primary">
          {selected === '' ? (
            <div className="flex flex-row w-full items-start lg:pl-4 lg:pr-4 ">
              <p className="w-full flex items-start ">{props.title}</p>
              <CaretDown size={20} />
            </div>
          ) : (
            <div className="flex flex-row w-full items-start lg:pl-4 lg:pr-4">
              <p className="w-full flex items-start ">{selected}</p>
              <CaretDown size={20} />
            </div>
          )}
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

import React, { Dispatch, SetStateAction, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, select } from "@nextui-org/react";
type typeProps = {
  title: string
  items: Array<string>
  setData: Dispatch<SetStateAction<object>>
}
export default function DropDownMenuCache(props: typeProps) {
  const [selected, setSelected] = useState('')
  return (
    <Dropdown shouldBlockScroll={false}  >
      <DropdownTrigger>
        <Button fullWidth={true}
          variant="ghost"
          color="primary"
        >
          {selected === '' ? (props.title) : (selected)}

        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat"
        aria-label="Action event example"
        onAction={(key) => {
          const selectedKey = key as string
          props.setData((prev) => ({
            ...prev,
            [props.title]: key,
          }));
          setSelected(selectedKey)
        }}

      >
        {props.items.map((item) => (
          <DropdownItem key={item} className="" color="default">
            {item}
          </DropdownItem>
        ))}


      </DropdownMenu>
    </Dropdown >
  );
}

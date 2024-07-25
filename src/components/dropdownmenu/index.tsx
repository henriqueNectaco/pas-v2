import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, select } from "@nextui-org/react";
type typeProps = {
  title: string
  items: Array<string>
}
export default function DropDownMenuCache(props: typeProps) {
  const [selected, setSelected] = useState(null)
  return (
    <Dropdown shouldBlockScroll={false} >
      <DropdownTrigger>
        <Button
          variant="ghost"
          color="primary"
        >
          {selected === null ? (props.title) : (selected)}

        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat"
        aria-label="Action event example"
        onAction={(key) => {
          props.setData((prev) => ({
            ...prev,
            [props.title]: key,
          }));
          setSelected(key)
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

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { CaretDown, DotsThreeOutlineVertical } from "phosphor-react";






export default function DropDownOne(props: any) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
        >
          Open Menu
          <CaretDown size={22} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => props.function(key)}
      >
        <DropdownItem key={props.first}>{props.first}</DropdownItem>
        <DropdownItem key={props.second}>{props.second}</DropdownItem>
        <DropdownItem key={props.third}>{props.third}</DropdownItem>



      </DropdownMenu>
    </Dropdown>
  );
}

import React from "react";
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
//import { ChevronDownIcon } from './ChevronDownIcon';
import { CaretDown } from "phosphor-react";
export default function ButtonOptions() {
  const [selectedOption, setSelectedOption] = React.useState(new Set(["merge"]));



  const labelsMap = {
    merge: "Ativos",
    squash: "Desativados",
    rebase: "Todos",
  }

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <ButtonGroup variant="flat" >
      <Button>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <CaretDown size={22} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem key="merge" >
            {labelsMap["merge"]}
          </DropdownItem>
          <DropdownItem key="squash" >
            {labelsMap["squash"]}
          </DropdownItem>
          <DropdownItem key="rebase" >
            {labelsMap["rebase"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
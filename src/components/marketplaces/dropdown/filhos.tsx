import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { DotsThreeOutlineVertical } from "phosphor-react";

type typeProps = {
  items: Array<string>
  onAction: () => void
}

export default function DropDownMenuFilhos(props: typeProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="md"
          variant="light"
          color="default"
          fullWidth={true}
        >
          <DotsThreeOutlineVertical size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={props.onAction} // Implementar lógica para ação aqui, se props.onAction}}
        color="primary"
        variant="solid"
      >
        {props.items.map((i: string, index) => (
          <DropdownItem key={index}>{i}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

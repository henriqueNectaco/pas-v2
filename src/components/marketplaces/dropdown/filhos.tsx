import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { DotsThreeOutlineVertical } from "phosphor-react";

type typeProps = {
  items: Array<string>
  onAction?: () => void
  fullWidth?: boolean
}

export default function DropDownMenuFilhos(props: typeProps) {
  return (<>
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="md"
          variant="light"
          color="default"
          fullWidth={props.fullWidth}
        >
          <DotsThreeOutlineVertical size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => {
          if (key === 'Trocar de parent') {
            alert('testes ')
          } else if (key === 'Reprocessar pedidos') { }
        }
        } // Implementar lógica para ação aqui, se props.onAction}}
        color="primary"
        variant="solid"
      >
        {props.items.map((i: string) => (
          <DropdownItem key={i}>{i}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </>)
}

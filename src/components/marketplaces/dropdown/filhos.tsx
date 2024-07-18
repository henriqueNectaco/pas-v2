import ModalMine from "@/components/modal";
import { format } from "@/utils/dates";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { DotsThreeOutlineVertical } from "phosphor-react";
import { useState } from "react";
import { parseDate } from '@internationalized/date'
import { useDisclosure } from "@nextui-org/react";
import Cookies from 'js-cookie'
import axios from "axios";
type typeProps = {
  items: Array<string>
  onAction?: () => void
  fullWidth?: boolean
}

export default function DropDownMenuFilhos(props: typeProps) {
  const token = Cookies.get('token')
  const [value, setValue] = useState({
    start: parseDate('2024-04-01'), // Data inicial
    end: parseDate('2024-04-30'), // Último dia do mês
  })
  const [action, setAction] = useState('Confirmar')
  const [date, setDate] = useState({
    startDate: format(value.start.toDate()),
    endDate: format(value.end.toDate())
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const reprocessarPedidos = async () => {
    try {
      const res = await axios.post(
        `https://urltestedo/${props.id}`,
        {
          startDate: date.startDate,
          endDate: date.endDate
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Faça algo com a resposta, se necessário
    } catch (error) {
      console.error(error);
    }
  };

  const handleFuncoes = async () => {
    switch (action) {
      case 'Reprocessar pedidos':
        reprocessarPedidos()


    }
  }
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
            onOpen()

          } else if (key === 'Reprocessar pedidos') {
            setAction('Reprocessar pedidos')
            onOpen()
          }
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
    <ModalMine action={action} onClick={handleFuncoes} value={value} setValue={setValue} isOpen={isOpen} onOpenChange={onOpenChange} MarketplacesArray={props.MarketplacesArray} />
  </>)
}

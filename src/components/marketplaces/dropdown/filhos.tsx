import ModalMine from "@/components/modal";
import { format } from "@/utils/dates";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { DotsThreeOutlineVertical } from "phosphor-react";
import { useState } from "react";
import { parseDate } from '@internationalized/date';
import { useDisclosure } from "@nextui-org/react";
import Cookies from 'js-cookie';
import axios from "axios";

type typeProps = {
  items: Array<string>
  onAction?: () => void
  fullWidth?: boolean
  MarketplacesArray: Array<any>
}

export default function DropDownMenuFilhos(props: typeProps) {
  const [id, setId] = useState(null);
  const [useDatePicker, setUseDatePicker] = useState<boolean>(false);
  const [useDropdownChangeParents, setUseDropdownChangeParents] = useState<boolean>(false);
  const token = Cookies.get('token');
  const [value, setValue] = useState({
    start: parseDate('2024-04-01'), // Data inicial
    end: parseDate('2024-04-30'), // Último dia do mês
  });
  const [action, setAction] = useState('Confirmar');
  const [date, setDate] = useState({
    startDate: format(value.start.toDate()),
    endDate: format(value.end.toDate())
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const changeParent = async () => {
    try {
      const res = await axios.put(
        `https://pas-aps.up.railway.app/establishment/${props.id}/change-parent`,
        { parentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const reprocessarPedidos = async () => {
    try {
      const res = await axios.post(
        `https://api.zsystems.com.br/z1/estabelecimentos/${props.id}/reprocessar-pedidos?startDate=${date.startDate}&endDate=${date.endDate}`,
        {}, // O corpo da requisição está vazio
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFuncoes = async () => {
    switch (action) {
      case 'Reprocessar pedidos':
        reprocessarPedidos();
        break;
      case 'Trocar de parent':
        changeParent();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dropdown shouldBlockScroll={true}>
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
          className="max-h-56 overflow-auto"
          aria-label="Action event example"
          onAction={(key) => {
            if (key === 'Trocar de parent') {
              setAction('Trocar de parent');
              setUseDatePicker(false);
              setUseDropdownChangeParents(true);
              onOpen();
            } else if (key === 'Reprocessar pedidos') {
              setAction('Reprocessar pedidos');
              setUseDropdownChangeParents(false);
              setUseDatePicker(true);
              onOpen();
            }
          }}
          color="primary"
          variant="solid"
        >
          {props.items.map((i: string) => (
            <DropdownItem key={i}>{i}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <ModalMine
        setId={setId}
        action={action}
        useDatePicker={useDatePicker}
        useDropdownChangeParents={useDropdownChangeParents}
        onClick={handleFuncoes}
        value={value}
        setValue={setValue}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        MarketplacesArray={props.MarketplacesArray}
      />
    </>
  );
}

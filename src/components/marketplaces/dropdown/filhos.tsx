import ModalMine from "@/components/modal";
import { format } from "@/utils/dates";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { DotsThreeOutlineVertical } from "phosphor-react";
import { useEffect, useState } from "react";
import { parseDate } from '@internationalized/date';
import { DateValue, RangeValue, useDatePicker, useDisclosure } from "@nextui-org/react";
import Cookies from 'js-cookie';
import axios from "axios";
import { objectMarketplace } from "@/types/marketplaces";
import router from "next/router";

type typeProps = {
  items: Array<string>
  onAction?: () => void
  fullWidth?: boolean
  MarketplacesArray: Array<objectMarketplace> | undefined
  id?: string
  nomefantasia: string
}

export default function DropDownMenuFilhos(props: typeProps) {
  const [id, setId] = useState<string | undefined>();

  const [modalProps, setModalProps] = useState({
    useDatePicker: false,
    useDesativar: false,
    useTaxForTransaction: false,
    useDropdownChangeParents: false,
    action: ''
  })
  const token = Cookies.get('token');
  const [value, setValue] = useState<RangeValue<DateValue>>({
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
        //`${process.env.NEXT_PUBLIC_LOCAL}/posts`,
        { parentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const reprocessarPedidos = async () => {
    //https://api.zsystems.com.br/z1/estabelecimentos/${props.id}/reprocessar-pedidos?startDate=${date.startDate}&endDate=${date.endDate}
    try {
      const res = await axios.post(
        `https://urltesteefodace/z1/estabelecimentos/${props.id}/reprocessar-pedidos?startDate=${date.startDate}&endDate=${date.endDate}`,
        // { headers: { Authorization: `Bearer ${token}` } }
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
  useEffect(() => {
    setDate(prev => ({
      ...prev,
      startDate: format(value.start.toDate()),
      endDate: format(value.end.toDate())
    }))
  }, [value])
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
              setModalProps(prev => ({
                ...prev,
                useDropdownChangeParents: true,
                useDatePicker: false
              }))
              onOpen();
            } else if (key === 'Reprocessar pedidos') {
              setAction('Reprocessar pedidos');
              setModalProps(prev => ({
                ...prev,
                useDropdownChangeParents: false,
                useDatePicker: true
              }))

              onOpen();
            } else if (key === 'Adicionar SSL') {
              router.push(`/marketplaces/${props.id}/${props.nomefantasia}/adicionar-ssl`)
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
        modalProps={modalProps}
        setId={setId}
        action={action}
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

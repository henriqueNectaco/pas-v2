import DropDownMenuCache from "@/components/dropdownmenu"
import { format, getLastDayOfMonth } from '@/utils/dates'
import { parseDate } from "@internationalized/date";
import Header from "@/components/Header";
import { today } from "@/utils";
import { ChangeEvent, useEffect, useState } from "react";
import DatePickerComponent from "@/components/date-picker";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { toast } from "sonner";
import { DateRangePicker } from "@nextui-org/date-picker";

type typeData = {
  date: string | null;
}


export default function RenovarCachePage() {



  const [valueDateRange, setValueDateRange] = useState({
    start: parseDate(today), // Data atual
    end: parseDate(today), // Último dia do mês
  })

  const [data, setData] = useState<typeData>({
    date: null
  });

  const [valueDataRecebimento, setValueDataRecebimento] = useState(parseDate(today));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:4000/renovarcache', { data });
      toast.success("Dados enviados com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar os dados.");
    }
  }

  useEffect(() => {
    if (valueDataRecebimento && typeof valueDataRecebimento.toDate === 'function') {
      setData((prev) => ({
        ...prev,
        date: format(valueDataRecebimento.toDate()),
        startDate: format(valueDateRange.start.toDate()),
        endDate: format(valueDateRange.end.toDate())
      }));
    }
  }, [valueDataRecebimento, valueDateRange, setValueDateRange]);

  return (
    <div className="max-w-screen w-full max-h-screen h-screen overflow-y-hidden bg-gray-200">
      <Header />
      <div className="w-full h-full border pt-12 flex flex-col items-center justify-start">
        <h1 className="text-2xl font-medium w-full flex items-center justify-center">Renovar cache</h1>
        <div className="w-full lg:w-2/3 flex flex-col lg:grid lg:grid-cols-2 bg-white h-full lg:h-2/3 lg:p-6 gap-4">
          <div className="flex flex-col border ">
            <DateRangePicker variant="flat" color="default" label="Selecione um intervalo" onChange={setValueDateRange} value={valueDateRange} />
            <DropDownMenuCache title={'Tipo de venda'} setData={setData} items={['Presencial', 'Online', 'Link de pagamento']} />
            <DropDownMenuCache title="Bandeira" items={['American Express', 'Elo', 'Maestro', 'Mastercard', 'Visa', 'Visa electron', 'Diners Club', 'Hiper', 'Hipercard', 'Banescard']} setData={setData} />
            <DropDownMenuCache title={'Formas Pagamentos'} setData={setData} items={['Boleto', 'Débito', 'Pix', 'Crédito à Vista', 'Crédito parcelado']} />
            <DropDownMenuCache title="Status da Venda" setData={setData} items={['Pendente', 'Aprovado', 'Falhado', 'Cancelado', 'Estornado']} />
            <DatePickerComponent value={valueDataRecebimento} onChange={setValueDataRecebimento} label="Data de recebimento" />
            <Input name="cliente" label='Cliente' variant="underlined" onChange={handleChange} />
            <Input name="estabelecimento" label='Estabelecimento' variant="underlined" onChange={handleChange} />
            <div className="flex lg:flex-row lg:gap-6">
              <Input name='de' type="number" onChange={handleChange} label='de' variant="underlined" />
              <Input name='ate' type="number" onChange={handleChange} label='ate' variant="underlined" />
            </div>
          </div>
          <div>teste
            <Button color="primary" fullWidth={true} onClick={handleSubmit}>ENVIAR</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

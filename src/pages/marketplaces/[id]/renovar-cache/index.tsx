import DropDownMenuCache from "@/components/dropdownmenu"
import { parseDate } from "@internationalized/date";
import Header from "@/components/Header";
import { formatDateToYYYYMMDD, today } from "@/lib";
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
      const res = await axios.post('http://localhost:4000/renovarcache', data);
      toast.success("Dados enviados com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar os dados.");
    }
  }



  useEffect(() => {
    if (valueDataRecebimento && typeof valueDataRecebimento.toDate === 'function') {
      setData((prev) => ({
        ...prev,
        date: formatDateToYYYYMMDD(valueDataRecebimento),
        startDate: formatDateToYYYYMMDD(valueDateRange.start),
        endDate: formatDateToYYYYMMDD(valueDateRange.end)
      }));
    }
  }, [valueDataRecebimento, valueDateRange, setValueDateRange]);
  useEffect(() => { console.log(data) }, [data])

  return (
    <div className="max-w-screen w-full max-h-screen h-screen lg:overflow-y-hidden bg-gray-200">

      <div className="w-full h-full border  lg:pt-16 flex flex-col items-center justify-start ">
        <div className="w-full lg:w-2/3 h-full lg:h-4/6 flex flex-col items-center justify-start bg-white rounded-md shadow-xl ">
          <h1 className="border-b border-black w-full p-4 flex items-center justify-center text-xl font-semibold">Renovar Cache</h1>
          <div className="w-full  flex flex-col lg:grid lg:grid-cols-2  h-full  p-4 lg:p-6 gap-4">
            <div className="flex flex-col lg:grid lg:grid-rows-4  ">
              <div className="row-span-1 flex flex-col items-center justify-center gap-2 ">
                <DateRangePicker radius="sm" size="md" variant="flat" color="default" label="Selecione um intervalo" onChange={setValueDateRange} value={valueDateRange} />
                <DatePickerComponent value={valueDataRecebimento} onChange={setValueDataRecebimento} label="Data de recebimento" />
              </div>
              <div className=" row-span-3 gap-4 ">
                <Input name="cliente" label='Cliente' variant="underlined" onChange={handleChange} />
                <Input name="estabelecimento" label='Estabelecimento' variant="underlined" onChange={handleChange} />
                <div className="flex lg:flex-row lg:gap-6">
                  <Input name='de' type="number" onChange={handleChange} label='de' variant="underlined" />
                  <Input name='ate' type="number" onChange={handleChange} label='ate' variant="underlined" />
                </div>
              </div>
            </div>
            <div className="pt-2 flex flex-col h-full lg:grid lg:grid-rows-2 gap-2">
              <div className="flex flex-col  " >
                <div className="flex lg:flex-row flex-col w-full  gap-1">
                  <DropDownMenuCache title={'Tipo de venda'} setData={setData} items={['Presencial', 'Online', 'Link de pagamento']} />
                  <DropDownMenuCache title="Status da Venda" setData={setData} items={['Pendente', 'Aprovado', 'Falhado', 'Cancelado', 'Estornado']} />
                </div>
                <DropDownMenuCache title="Bandeira" items={['American Express', 'Elo', 'Maestro', 'Mastercard', 'Visa', 'Visa electron', 'Diners Club', 'Hiper', 'Hipercard', 'Banescard']} setData={setData} />
                <DropDownMenuCache title={'Formas Pagamentos'} setData={setData} items={['Boleto', 'Débito', 'Pix', 'Crédito à Vista', 'Crédito parcelado']} />
              </div>
              <div className="border border-black"><Button color="primary" fullWidth={true} onClick={handleSubmit}>ENVIAR</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

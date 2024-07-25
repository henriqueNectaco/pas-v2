import DropDownMenuCache from "@/components/dropdownmenu"
import { format } from '@/utils/dates'
import { parseDate } from "@internationalized/date";
import Header from "@/components/Header";
import { today } from "@/utils";

import { ChangeEvent, useEffect, useState } from "react";
import DatePickerComponent from "@/components/date-picker";
import { Input } from "@nextui-org/input";
type typeData = {
  date: date
}
export default function RenovarCachePage() {
  const [data, setData] = useState<typeData>({
    date: null
  })
  const [valueDataRecebimento, setValueDataRecebimento] = useState(parseDate(today));
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev, [name]: value
    }))
  }
  useEffect(() => { console.log(data) }, [data])

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      date: format(valueDataRecebimento.toDate())
    }))
  }, [valueDataRecebimento])
  return (
    <div className="max-w-screen w-full max-h-screen h-screen overflow-y-hidden">
      <Header />
      <div className="w-full h-full border    pt-12 flex flex-col items-center justify-start">
        <h1 className="text-2xl font-medium w-full flex items-center justify-center">Renovar cache</h1>
        <div className="w-full lg:w-2/3 flex flex-col lg:grid lg:grid-cols-2 bg-gray-200 h-full lg:h-2/3">

          <div>
            <DropDownMenuCache title={'Tipo de venda'} setData={setData} items={['Presencial', 'Online', 'Link de pagamento']} />
            <DropDownMenuCache title="Bandeira" items={['American Express', 'Elo', 'Maestro', 'Mastercard', 'Visa', 'Visa electron', 'Diners Club', 'Hiper', 'Hipercard', 'Banescard']} setData={setData} />
            <DropDownMenuCache title={'Formas Pagamentos'} setData={setData} items={['Boleto', 'Débito', 'Pix', 'Crédtio á Vista', 'Crédito parcelado']} />
            <DropDownMenuCache title="Status da Venda" setData={setData} items={['Pendente', 'Aprovado', 'Falhado', 'Cancelado', 'Estornado']} />
            <DatePickerComponent value={valueDataRecebimento} onChange={setValueDataRecebimento} label="Data de recebimento" />
            <Input name="cliente" label='Cliente' variant="bordered" onChange={handleChange} />
            <Input name="estabelecimento" label='Estabelecimento' variant="bordered" onChange={handleChange} />
          </div>
          <div>teste</div>
        </div>
      </div>
    </div>
  )
}
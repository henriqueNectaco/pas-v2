import { DateRangePicker } from '@nextui-org/react'

import { datePickerProps } from '@/@types/dashboard'
// Função para obter o último dia do mês atual

export default function DateRangePickerComponent(props: datePickerProps) {
  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="w-full flex flex-col gap-y-2">
        <DateRangePicker
          label="Selecione um intervalo"
          value={props.value}
          onChange={props.setValue}
          fullWidth={true}
          variant={props.variant}
        />
      </div>
    </div>
  )
}

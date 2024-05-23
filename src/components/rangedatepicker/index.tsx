import React, { useState } from 'react'
import { DateRangePicker } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { formatDatePicker, getLastDayOfMonth } from '@/utils/dates'

// Função para obter o último dia do mês atual

export default function DateRangePickerComponent() {
  const today = new Date()
  const lastDayOfMonth = getLastDayOfMonth(today)

  const [value, setValue] = useState({
    start: parseDate(today.toISOString().split('T')[0]), // Data atual
    end: parseDate(lastDayOfMonth.toISOString().split('T')[0]), // Último dia do mês
  })

  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="w-full flex flex-col gap-y-2">
        <DateRangePicker
          label="Selecione um intervalo"
          value={value}
          onChange={setValue}
          fullWidth={true}
          variant="underlined"
        />
      </div>
    </div>
  )
}
/*
      <p>{formatDatePicker(value.start.toDate())}</p>
<p>{formatDatePicker(value.end.toDate())}</p>
console.log(formatDatePicker(value.start.toDate()))
*/

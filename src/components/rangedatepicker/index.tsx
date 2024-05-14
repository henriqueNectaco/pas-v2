import React from 'react'
import { DateRangePicker } from '@nextui-org/react'
import { parseDate, getLocalTimeZone } from '@internationalized/date'
import { useDateFormatter } from '@react-aria/i18n'

export default function DateRangePickerComponent() {
  const [value, setValue] = React.useState({
    start: parseDate('2024-04-01'),
    end: parseDate('2024-04-08'),
  })

  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="w-full flex flex-col gap-y-2  ">
        <DateRangePicker
          fullWidth={true}
          label="Selecione um intervalo"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  )
}

/*
<p className="text-default-500 text-sm">
          Selected date:{' '}
          {value
            ? formatter.formatRange(
                value.start.toDate(getLocalTimeZone()),
                value.end.toDate(getLocalTimeZone()),
              )
            : '--'}
        </p>
  
  
  const formatter = useDateFormatter({ dateStyle: 'long' })
  
        */

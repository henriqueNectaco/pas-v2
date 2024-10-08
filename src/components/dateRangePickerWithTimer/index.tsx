import React from 'react'
import { DateRangePicker, DateValue, RangeValue } from '@nextui-org/react'
import { parseZonedDateTime } from '@internationalized/date'

type PropsType = {
  setValue: (value: RangeValue<DateValue>) => void | undefined
}
export default function DateRangeWithTimer(props: PropsType) {
  // const [value, setValue] = React.useState({
  //   start: parseZonedDateTime('2024-04-01T00:00[America/Sao_Paulo]'),
  //   end: parseZonedDateTime('2024-04-08T00:00[America/Sao_Paulo]'),
  // })

  // useEffect(() => {
  //   console.log(
  //     formatDateRangeTimer(value.start) + formatDateRangeTimer(value.end),
  //   )
  // }, [value])

  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DateRangePicker
        hourCycle={24}
        label="Event duration"
        hideTimeZone
        visibleMonths={2}
        defaultValue={{
          start: parseZonedDateTime('2024-04-01T00:45[America/Sao_Paulo]'),
          end: parseZonedDateTime('2024-04-08T11:15[America/Sao_Paulo]'),
        }}
        onChange={props.setValue}
      />
    </div>
  )
}

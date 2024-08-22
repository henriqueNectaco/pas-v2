import React from 'react'
import { DatePicker, DateValue } from '@nextui-org/react'

type typeProps = {
  value: DateValue | null | undefined
  label: string
  onChange: (value: DateValue) => void
  className?: string
}
export default function DatePickerComponent(props: typeProps) {
  return (
    <DatePicker
      radius="sm"
      color="primary"
      variant="faded"
      labelPlacement="inside"
      size="md"
      className={props.className}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

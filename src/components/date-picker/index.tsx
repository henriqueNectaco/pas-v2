import React from "react";
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

type typeProps = {
  value: any
  label: string
  onChange: any
  className: string
}
export default function DatePickerComponent(props: typeProps) {




  return (


    <DatePicker radius="sm" color="primary" variant="faded" labelPlacement="inside" size="md" className={props.className} label={props.label} value={props.value} onChange={props.onChange} />


  );
}

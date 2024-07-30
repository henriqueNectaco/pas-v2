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


    <DatePicker color="primary" variant="faded" labelPlacement="outside" size="lg" className={props.className} label={props.label} value={props.value} onChange={props.onChange} />


  );
}

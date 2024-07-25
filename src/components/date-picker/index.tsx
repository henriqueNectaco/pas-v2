import React from "react";
import { DatePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

type typeProps = {
  value: any
  setValue: any
  label: string
}
export default function DatePickerComponent(props: typeProps) {




  return (


    <DatePicker color="primary" variant="faded" labelPlacement="outside" size="lg" className="w-full lg:w-2/4" label={props.label} value={props.value} onChange={props.onChange} />


  );
}

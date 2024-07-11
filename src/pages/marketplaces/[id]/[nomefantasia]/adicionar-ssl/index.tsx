import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input } from "@nextui-org/react";
import Header from "@/components/Header";
import { Stepper } from "react-form-stepper";
import StepperComponent from "@/components/cadastroMarketplace/steper";

export default function App() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [stepsData] = useState([
    { label: 'Validar pki', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
  ])
  return (<div className="max-w-screen w-full h-screen overflow-y-hidden">
    <Header />
    <div className="bg-gray-200 h-full flex flex-col items-center justify-start lg:p-12 p-4 ">
      <Card className="lg:w-4/5 w-full  h-5/6 lg:h-4/6">
        <CardHeader className="flex items-center justify-center">

          <h1 className="font-semibold  text-xl lg:text-3xl">Validar pki</h1>

        </CardHeader>
        <div className="border-b border-black">
          <StepperComponent activeStep={activeStep} stepsData={stepsData} />
        </div>
        <CardBody className=" flex flex-col items-center justify-center">
          <div className="lg:grid lg:grid-cols-3 flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center"><Input variant='underlined' className="lg:w-3/5 " /></div>
            <div className="flex items-center justify-center"><Input variant='underlined' className="lg:w-3/5 " /></div>
            <div className="flex items-center justify-center"><Input variant='underlined' className="lg:w-3/5 " /></div>
          </div>

        </CardBody>
        <div className="border-b border-black"></div>
        <CardFooter className="lg:p-4 p-3 flex flex-row items-center   justify-between lg:justify-end gap-4">

          <Button color="danger" variant="bordered">limpar Campos </Button>
          <Button color="primary" variant="bordered">Validar pki</Button>




        </CardFooter>
      </Card>
    </div>
  </div >
  );
}

import React, { ChangeEvent, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input, Checkbox } from "@nextui-org/react";

import { Stepper } from "react-form-stepper";
import StepperComponent from "@/components/cadastroMarketplace/steper";
import axios from "axios";
import { useRouter } from "next/router";
import FilePonds from "@/components/cadastroMarketplace/filepond";
type typeData = {
  nome: string
  dominio: string
}

export default function App() {
  const router = useRouter();
  const { id, nomefantasia } = router.query;
  const [data, setData] = useState({
    nome: nomefantasia
  })
  const [activeStep, setActiveStep] = useState<number>(0)
  const [stepsData] = useState([
    { label: 'Validar pki', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
  ])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (data: typeData) => {
    console.log(id, nomefantasia)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/adicionarssl`, data)
    } catch (error) { console.error(error) }
  }

  const handleNext = () => setActiveStep(activeStep + 1)
  const handleNextStep = () => {
    switch (activeStep) {
      case 0:
        handleNext()
        break;
      case 1:
        handleSubmit(data)
        break;

    }
  }
  return (<div className="max-w-screen w-full h-screen overflow-y-hidden">

    <div className="bg-gray-200 h-full flex flex-col items-center justify-start lg:p-12 p-4 ">
      <Card className="lg:w-4/5 w-full  h-5/6 lg:h-4/6">
        <CardHeader className="flex items-center justify-center">

          <h1 className="font-semibold  text-xl lg:text-3xl">Validar pki</h1>

        </CardHeader>
        <div className="border-b border-black">
          <StepperComponent activeStep={activeStep} stepsData={stepsData} />
        </div>
        <CardBody className=" flex flex-col items-center justify-center">
          {activeStep === 0 && (

            <div className="lg:grid lg:grid-cols-3 flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center"><Input required={true} variant='underlined' className="lg:w-3/5" name="dominio" onChange={handleChange} label='Dominio' /></div>
              <div className="flex items-center justify-center"><Input variant='underlined' className="lg:w-3/5" name="nome" value={nomefantasia} disabled={true} label='Nome' /></div>
              <div className="flex items-center justify-center"><Input variant='underlined' className="lg:w-3/5" name="teste" onChange={handleChange} label='Teste' /></div>
              <Checkbox name='checkbox' onChange={handleChange} />
              <FilePonds />
            </div>
          )}
          {activeStep === 1 && (
            <p>teste ainda nada</p>
          )}


        </CardBody>
        <div className="border-b border-black"></div>
        <CardFooter className="lg:p-4 p-3 flex flex-row items-center   justify-between lg:justify-end gap-4">
          {activeStep === 1 && (<Button color="danger" variant="bordered" onClick={() => setActiveStep(activeStep - 1)}>Voltar </Button>)}

          <Button color="primary" variant="bordered" onClick={handleNextStep}>Validar pki</Button>




        </CardFooter>
      </Card>
    </div>
  </div >
  );
}

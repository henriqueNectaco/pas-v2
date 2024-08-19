import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Input, Checkbox } from "@nextui-org/react";
import StepperComponent from "@/components/cadastroMarketplace/steper";
import axios from "axios";
import { useRouter } from "next/router";
import FilePonds from "@/components/cadastroMarketplace/filepond";
import { FilePondFile } from "filepond";
import { toast } from "sonner";
type typeData = {
  nome: string | string[] | undefined
  dominio: string
}

export default function App() {
  const [pki, setPki] = useState<File[]>([])
  const router = useRouter();
  const { id, nomefantasia } = router.query;
  const [data, setData] = useState<typeData>({
    nome: nomefantasia,
    dominio: ''
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

  const handleSubmit = async () => {

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/adicionarssl`, data)
    }
    catch (error) {
      console.error(error)
    }
  }


  const handleNextStep = () => {
    switch (activeStep) {
      case 0:
        setActiveStep(activeStep + 1)
        break;
      case 1:
        handleSubmit()
        break;

    }
  }
  const handleUpdatePki = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter(fileItem => {
      const file = fileItem.file as File; // Type casting here
      const fileName = file.name.toLowerCase(); // Get file name and convert to lower case

      // Check if the file has a .pki extension
      if (fileName.endsWith('.pki')) {
        return true;
      } else {
        toast.warning('Apenas arquivos com a extensão .pki são permitidos');
        return false;
      }  
    });

    // Set the valid files to the loader
    setPki(validFiles.map(fileItem => fileItem.file as File)); // Type casting here
  };


  useEffect(() => { console.log(data) }, [data])
  return (<div className=" flex flex-col items-center bg-gray-300 max-w-screen w-full h-full lg:h-screen overflow-y-hidden p-6 lg:p-12 lg:pt-20">

    <div className=" h-full flex flex-col items-center justify-start bg-white shadow-xl rounded-md w-full lg:w-2/4 border  lg:h-2/3">
      <div className="p-4 border-b  border-black font-bold flex items-center justify-center text-2xl w-full">Validar pki</div>
      {activeStep === 0 && (<div className="flex flex-col lg:grid lg:grid-cols-2 border w-full h-full p-4 gap-2">
        <div className="border h-full p-4 space-y-4"> 

                    <FilePonds titulo=".pki" />
        </div>
        <div className="border space-y-4 p-4 h-full">
          <Input required={true} variant='underlined' name="dominio" onChange={handleChange} label='Dominio' />
          <Input variant='underlined' name="nome" value={nomefantasia} disabled={true} label='Nome' />
          <Checkbox onChange={handleChange} size="lg" radius="lg" name="renovacao">Renovação?</Checkbox>
        </div>

      </div>)}
      <div className="border-t border-black flex items-center justify-end p-4 w-full ">
        <Button size="md" variant="bordered" color="primary" onClick={handleNextStep}>Validar pki </Button>
      </div>
    </div>
  </div >
  );
}
/* 

*/
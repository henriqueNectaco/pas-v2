import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,

} from '@/components/ui/card'
import axios from "axios";
import FilePonds from "@/components/cadastroMarketplace/filepond";

export default function CadastrarFilho() {
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepsData] = useState([
    { label: 'Validar pki', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
  ]);

  const fetchMarketplace = async () => {
    try {
      const res = await axios.get(`https://api.zsystems.com.br/z1/marketplace/3`);
      // Add logic to handle the response if needed
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterMarketplaceChild = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/cadastromarketplace`, data);
      // Add logic to handle the response if needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch marketplace data if needed
    fetchMarketplace();
  }, []);

  return (
    <div className="max-w-screen max-h-screen w-full h-screen lg:overflow-y-hidden">

    </div>
  );
}

/*   <div className="bg-gray-200 h-full flex flex-col items-center justify-start lg:p-12 p-4">
        <Card className="lg:w-4/5 w-full h-full lg:h-5/6 ">
          <CardHeader className="flex items-center justify-center pt-6 border ">
            <h1 className="font-semibold text-xl lg:text-3xl">Cadastrar marketplace filho</h1>
          </CardHeader>
          <div className="border-b border-black"></div>
          <CardContent className=" h-full flex flex-col items-center justify-center ">
            <div className="lg:grid h-full lg:grid-cols-3 flex flex-col items-center justify-center w-full">
              <div className="flex  flex-col items-center justify-center border border-red-700 h-full  p-6">
                <Input name="field1" variant='underlined' className="" onChange={handleChange} />
                <Input name="field2" variant='underlined' className="" onChange={handleChange} />
                <FilePonds titulo="teste" />
              </div>
              <div className="flex  flex-col  items-center justify-center h-full gap-4 ">
                <Input name="field2" variant='underlined' className="" onChange={handleChange} />
                <Input name="field2" variant='underlined' className="" onChange={handleChange} />
                <Input name="field2" variant='underlined' className="" onChange={handleChange} />
              </div>
              <div className="flex items-center flex-col  justify-center h-full gap-4 w-full border ">
                <FilePonds titulo="teste" />
                <FilePonds titulo="teste" />

              </div>
            </div>
          </CardContent>
          <div className="border-b border-black"></div>
          <CardFooter className="lg:p-4 p-3 flex flex-row items-center justify-between lg:justify-end gap-4">
            <Button color="danger" variant="bordered" onClick={() => setData({})}>Limpar Campos</Button>
            <Button color="primary" variant="bordered" onClick={handleRegisterMarketplaceChild}>Validar pki</Button>
          </CardFooter>
        </Card>
      </div> */
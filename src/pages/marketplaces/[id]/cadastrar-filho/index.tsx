import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Input } from "@nextui-org/react";
import axios from "axios";

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
    <div className="max-w-screen w-full h-screen overflow-hidden">
      <div className="bg-gray-200 h-full flex flex-col items-center justify-start lg:p-12 p-4">
        <Card className="lg:w-4/5 w-full h-5/6 lg:h-4/6">
          <CardHeader className="flex items-center justify-center lg:p-10 p-4">
            <h1 className="font-semibold text-xl lg:text-3xl">Cadastrar marketplace filho</h1>
          </CardHeader>
          <div className="border-b border-black"></div>
          <CardBody className="flex flex-col items-center justify-center">
            <div className="lg:grid lg:grid-cols-3 flex flex-col items-center justify-center w-full">
              <div className="flex items-center justify-center">
                <Input name="field1" variant='underlined' className="lg:w-3/5" onChange={handleChange} />
              </div>
              <div className="flex items-center justify-center">
                <Input name="field2" variant='underlined' className="lg:w-3/5" onChange={handleChange} />
              </div>
              <div className="flex items-center justify-center">
                <Input name="field3" variant='underlined' className="lg:w-3/5" onChange={handleChange} />
              </div>
            </div>
          </CardBody>
          <div className="border-b border-black"></div>
          <CardFooter className="lg:p-4 p-3 flex flex-row items-center justify-between lg:justify-end gap-4">
            <Button color="danger" variant="bordered" onClick={() => setData({})}>Limpar Campos</Button>
            <Button color="primary" variant="bordered" onClick={handleRegisterMarketplaceChild}>Validar pki</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

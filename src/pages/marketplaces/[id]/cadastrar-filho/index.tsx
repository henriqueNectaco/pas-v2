import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import FilePonds from "@/components/cadastroMarketplace/filepond";
import { useRouter } from "next/router";
import { localUrl, token } from "@/utils";

export default function CadastrarFilho() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [stepsData] = useState([
    { label: 'Validar pki', active: activeStep === 0 },
    { label: 'Arquivos', active: activeStep === 1 },
  ]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(``, data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarketplace = async () => {
    const { id } = router.query;
    try {
      const res = await axios.get(`https://api.zsystems.com.br/z1/marketplace/${id}`, { headers: { Authorization: `Bearer ${token}` } });
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
    setIsLoading(true);
    try {
      const res = await axios.post(`${localUrl}/cadastromarketplace`, data);
      console.log(res.data);
      // Handle success (e.g., navigate to another page, show success message, etc.)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestartNginx = async () => {
    try {
      // Implement your logic here
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        handleRegisterMarketplaceChild();
        setActiveStep(activeStep + 1)
        break;
      case 1:
        handleRestartNginx();
        break;
      default:
        alert('Algo inesperado aconteceu');
    }
  };

  useEffect(() => {
    fetchMarketplace();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="max-w-screen w-full h-full lg:h-screen bg-gray-200 pt-8 lg:pt-16 p-4 flex flex-col lg:justify-start lg:items-center">
      <div className="w-full h-full lg:w-3/4 bg-white lg:max-h-screen lg:h-2/3 flex flex-col items-center shadow-2xl rounded-md">
        <h1 className="text-lg font-bold border-b border-black w-full flex items-center justify-center p-4">
          {activeStep === 0 ? 'Cadastrar marketplace filho' : 'Reiniciar Nginx'}
        </h1>
        {activeStep === 0 && (
          <div className="p-4 lg:grid lg:grid-cols-3 flex flex-col h-full lg:h-3/4 w-full gap-4">
            <div className="h-full p-4 flex flex-col items-center justify-start lg:justify-center space-y-4">
              <Input variant="underlined" onChange={handleChange} name='marketplace_id' placeholder="Marketplace Id" fullWidth />
              <Input variant="underlined" onChange={handleChange} name='estabelecimento_id' placeholder="Estabelecimento id" fullWidth />
              <div className="w-full h-full"><FilePonds /></div>
            </div>
            <div className="h-full p-4 flex flex-col items-center justify-start space-y-4">
              <Input variant="underlined" onChange={handleChange} name="nome" placeholder="Nome" fullWidth />
              <Input variant="flat" color="primary" onChange={handleChange} type="color" name="color" placeholder="Cor" fullWidth />
              <div className="w-full h-full"><FilePonds /></div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-4">
              <Input variant="underlined" onChange={handleChange} name='dominio' placeholder="Dominio" fullWidth />
              <Input variant="underlined" onChange={handleChange} name='website' placeholder="Website" fullWidth />
              <div className="w-full h-full"><FilePonds /></div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div>tesadw</div>
        )}
        <div className="border-t border-black p-4 w-full flex items-center justify-center lg:justify-end">
          <Button
            onAuxClick={handleNext}
            color="primary"
            variant="solid"
            onClick={handleNext}
            disabled={isLoading}
          >
            {isLoading ? 'Processando...' : 'Finalizar cadastro'}
          </Button>
        </div>
      </div>
    </div>
  );
}

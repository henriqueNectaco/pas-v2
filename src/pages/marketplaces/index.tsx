import Cookies from "js-cookie";
import React from "react";
import Header from '../../components/Header/index';
import { Dropdown, Input, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner } from "@nextui-org/react";
import ButtonOptions from './buttonOptions'
import { useEffect, useState } from "react";
import DropdownMenuFirst from './a'
import { DatePicker } from "@nextui-org/react";

import axios from "axios";
import DropdownMenuSecond from "./dropdown";
import DropDownOne from "./newDrop";
import { CaretDown, DotsThreeOutlineVertical } from "phosphor-react";
export default function Marketplace() {
  const token = Cookies.get('token')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [name, setName] = useState('')
  const [datePickerValue, setDatePickerValue] = useState(null)
  const [idInput, setIdInput] = useState('')
  const [resData, setResData] = useState('')
  const [state, setState] = useState('ativos')
  const [marketplacesOptions,setMarketplacesOptions]=useState(null)
  const handleCleanInput = () => {
    setEmail('')
    setCnpj('')
    setName('')
    setIdInput('')
    setDatePickerValue(null)
    setState(null)

  }
  const handleChange = (e: any) => { setState(key); }

  const handleDatePickerChange = (newValue: any) => {
    setDatePickerValue(newValue); // Atualiza o estado com o novo valor do DatePicker
  };
  const handleChangeNameInput = (e: any) => {
    setName(e.target.value)
  }
  const handleChangeCnpjInput = (e: any) => {
    setCnpj(e.target.value)
  }
  const handleChangeEmailInput = (e: any) => {
    setEmail(e.target.value)
  }
  const handleChangeIdInput = (e: any) => { setIdInput(e.target.value) }
  const fetchFilteredData = async () => {
    try {
      const res = await axios.get(`https://api.zsystems.com.br/z1/marketplaces?status=${state}`, { headers: { Authorization: `Bearer ${token}` }, })

      setResData(res.data.marketplaces)
      console.log('res com filtro', res.data)

    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {


    const getServerSideDate = async () => {
      try {
        const res = await axios.get(`https://api.zsystems.com.br/z1/marketplaces?status=ativo`, { headers: { Authorization: `Bearer ${token}` }, });

        setResData(res.data.marketplaces)
        console.log('res.data sem filtro', res.data.marketplaces)

      } catch (error) {
        console.error(error);
      }
    };

    getServerSideDate();
  }, []);
  useEffect(() => {
    console.log('resData useeffect', resData)
  }, [resData])
  console.log('state', state)
  return (
    <div className=" h-screen max-w-screen w-full flex flex-col items-center  ">
      <Header />
      <div className="w-full  p-2 lg:p-4">
        <div className=" w-full     gap-2 lg:gap-6  p-2 lg:p-4 lg:pl-8 flex lg:pr-8  flex-col lg:flex-row items-center  border-2  ">
          <Button className='lg:w-[20vw] w-3/4 ' radius="md" size="md" variant="solid" color="primary">Reprocessar todas as vendas</Button>
          <Button className=' lg:w-[20vw] w-3/4' radius="md" size="md" variant="solid" color="primary">Novo Marketplace</Button>
          <Button className='lg:w-[20vw] w-3/4' radius="md" size="md" variant="solid" color="primary">Importar todas as vendas</Button>
        </div>
        <div className=" mt-2 w-full border-2 p-12 md:p-20 lg:p-6 gap-4 flex flex-col lg:flex-row items-center lg:items-end justify-between  ">
          <Input className="w-full lg:w-1/8" placeholder="ID" variant="underlined" value={idInput} onChange={handleChangeIdInput} />
          <Input className="w-full lg:w-1/8" placeholder="Nome" variant="underlined" value={name} onChange={handleChangeNameInput} />
          <DatePicker className="w-full lg:w-1/8" onChange={handleDatePickerChange} value={datePickerValue} variant="underlined" label={'Selecione uma data'} />
          <Input placeholder="email" className="w-full lg:w-1/8" variant="underlined" value={email} onChange={handleChangeEmailInput} />
          <Input placeholder="CNPJ" className="w-full lg:w-1/8" variant="underlined" value={cnpj} onChange={handleChangeCnpjInput} />

          <Dropdown >
            <DropdownTrigger>
              <Button
                variant="bordered"
              >
                {state}
                <CaretDown size={12} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key) => {
                setState(key)

              }}
              color="primary"
              variant="solid"
              size='lg'
            >
              <DropdownItem key="todos">todos</DropdownItem>
              <DropdownItem key="ativos">ativos</DropdownItem>
              <DropdownItem key="removido">desativados</DropdownItem>

            </DropdownMenu>
          </Dropdown>


          <Button fullWidth={true} onClick={handleCleanInput} color="danger">Limpar</Button>
          <Button fullWidth={true} onClick={fetchFilteredData} color="primary">Filtrar</Button>
        </div>
      </div><>
        {!resData ? (<Spinner size="4xl" color="primary" />) : (
          <div className="w-full h-full   space-y-2   p-4 ">
            <>
              {resData.map((resData: any) => (
                <div className="w-full border-2 rounded-lg flex  flex-col   items-center justify-center lg:flex-row p-4 gap-2 ">

                  <div className="w-1/4  flex flex-col items-center justify-center">
                    <p>Id:</p>
                    <p>{resData.id}</p>
                  </div>
                  <div className="w-1/4  flex flex-col items-center justify-center">
                    <p>ID EC:</p>
                    <p>{resData.mainECId}</p>
                  </div>
                  <div className="w-1/4  flex flex-col items-center justify-center">
                    <p>Marketplace
                    </p>
                    <p>{resData.mainECNomeFantasia}</p>
                  </div>

                  <div className="w-1/4  flex flex-col items-center justify-center">
                    <p>Email:</p>
                    <p>{resData.mainECEmail}</p>
                  </div>
                  <div className="w-1/4  flex flex-col items-center justify-center">
                  <Dropdown >
            <DropdownTrigger>
              <Button
                variant="light"
              >

                <DotsThreeOutlineVertical size={25} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key) => {
if(key=='addssl'){alert('add ssl?'+ key)}else{alert('nao foi')}

              }}
              color="primary"
              variant="solid"
              size='lg'
            >
              <DropdownItem key="registerchildmarketplace">Cadastrar Marketplace filho</DropdownItem>
              <DropdownItem key="showmarketplaceschilds">Visualizar Marketplaces filhos</DropdownItem>
              <DropdownItem key='showestabelecimentschilds'>Visualizar Estabelecimentos filhos</DropdownItem>
<DropdownItem key='addssl'>Adicionar SSL</DropdownItem>
<DropdownItem key='reprocessSales'>Reprocessar Vendas</DropdownItem>
<DropdownItem key='importEc'>Importar EC's</DropdownItem>
<DropdownItem key='taxfortransaction'>Cobrança por transação</DropdownItem>
<DropdownItem key='importSales'>Importar Vendas</DropdownItem>
<DropdownItem key='renewcache'>Renovar Cache</DropdownItem>
<DropdownItem key='turnOff'>Desativar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
                    
                  </div>
                </div>

              ))}

            </>
          </div>
        )}
      </>
    </div>

  )
}
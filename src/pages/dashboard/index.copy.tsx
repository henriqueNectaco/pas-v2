import axios from 'axios';
import Header from '../../components/Header/index';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Button, Spinner } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { DatePicker } from '@nextui-org/react';


export default function DashBoard() {
  const [serviveStatus, setServiceStatus] = useState(null);
  const [amountIndicator, setAmountIndicator] = useState(null);
  const [totalMKT, setTotalMKT] = useState(null)
  const [totalProcessed, setTotalProcessed] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const token = Cookies.get('token')
  /*const api = async (data) => {

    try {
      const response = await axios.get('https://api.zsystems.com.br/z1/services-status', data);
      const status = response.data
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  } */


  function formatDateToYYYYMMDD(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // O mês começa de 0 (janeiro é 0)
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Exemplo de uso
  const currentDate = new Date(); // Data atual
  const formattedDate = formatDateToYYYYMMDD(currentDate);
  console.log(formattedDate); // Saída: "yyyy-mm-dd"
  const previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - 30);
  const formattedPreviousDate = formatDateToYYYYMMDD(previousDate);




  useEffect(() => {
    const fetchTotalChild = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=&endDate=`, {
          headers: { Authorization: `Bearer ${token}` },
          //setAlgumacoisa(res.data) 
        })
      }
      catch (error) { console.error(error) }
    }

    const fetchDataServiceStatus = async () => {
      try {
        const response = await axios.get('https://api.zsystems.com.br/z1/services-status', { headers: { Authorization: `Bearer ${token}` }, });
        setServiceStatus(response.data.services);

      } catch (error) {
        console.error('Erro ao chamar a API:', error);
      }
    };
    const fechAmountData = async () => {
      try {
        const response = await axios.get('https://api.zsystems.com.br/z1/indicadores', { headers: { Authorization: `Bearer ${token}` }, });
        setAmountIndicator(response.data)
        console.log(amountIndicator)
      } catch (error) {
        console.error(error)
      }
    };
    const fetchTotalProcessed = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/sale/total-processed?startDate=2024-04-22&endDate=2024-04-22
        `, { headers: { Authorization: `Bearer ${token}` }, })
        setTotalProcessed(res.data)
      } catch (error) { console.error(error) }
    }

    const fechTotalMKT = async () => {
      try {
        const response = await axios.get(`https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=${formattedPreviousDate}&endDate=${formattedDate}`, { headers: { Authorization: `Bearer ${token}` }, });
        setTotalMKT(response.data)

      } catch (error) {
        console.error(error)
      }
    }
    fetchDataServiceStatus();
    fechAmountData()
    fechTotalMKT()
    fetchTotalProcessed()
  }, []);

  // Função para formatar a data para yyyy-mm-dd



  return (<div className=' border-2 h-screen w-screen flex flex-col items-center  '>
    <Header />

    <div className='flex flex-col items-start justify-center w-full  border-2 border-red-500 p-2 gap-2'>

      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Vendas</p>
        {!amountIndicator ? (<Spinner />) :
          (<p> {amountIndicator.result.transacionadoHoje.quantidade}</p>)}

      </div>
      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total Vendido</p>
        {!amountIndicator ? (<Spinner />) : (<p>{amountIndicator.result.transacionadoHoje.valorTotal}</p>)}
      </div>


    </div>
    <div className='border-2 border-blue-400 w-full h-screen flex  flex-col items-center justify-center  p-2 gap-2'>
      <div className='h-2/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between p-2'>
        <p>Reprocessar venda</p>
        <div className='border-2 w-full h-full flex  flex-col lg:flex-row items-end justify-between p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='lg:w-[30vw]' />
          <div className='border-2 flex flex-row items-center gap-1 w-2/4'> De: <DatePicker variant='underlined' label={'teste'} />
            Até: <DatePicker variant='underlined' label={'teste'} />

          </div>
          <Button color='primary' variant='solid' className='' size='md'>Enviar</Button>
        </div>

      </div>


      <div className='h-2/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between p-2'>
        <p>Reprocessar saldo</p>
        <div className='border-2 w-full h-full flex flex-col lg:flex-row items-end justify-between p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[30vw]' />

          <Input variant='underlined' placeholder='Dias' size='sm' className='w-[30vw]' />

          <Button color='primary' variant='solid' className='' size='md'>Enviar</Button>
        </div>

      </div>



      <div className='h-2/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between p-2'>
        <p>Consolidar extrato</p>
        <div className='border-2 w-full h-full flex  flex-col lg:flex-row items-end justify-between p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[30vw]' />
          <div className='border-2 flex flex-row items-center gap-1 w-2/4'> De: <DatePicker variant='underlined' label={'teste'} />
            Até: <DatePicker variant='underlined' label={'teste'} />

          </div>
          <Button color='primary' variant='solid' className='' size='md'>Enviar</Button>
        </div>

      </div>
    </div>
  </div>


  )
}

/*
 <div className='border-2 border-blue-400 w-full h-full flex flex-col items-center justify-center  p-2 gap-2'>
<div className='lg:h-2/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between lg:p-2'>
        <p>Reprocessar venda</p>
        <div className='border-2 w-full lg:h-full flex lg:flex-row items-end justify-between p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[30vw]' />
          <div className='border-2 flex flex-row items-center gap-1 w-2/4'> De: <DatePicker variant='underlined' label={'teste'} />
            Até: <DatePicker variant='underlined' label={'teste'} />

          </div>
          <Button color='primary' variant='solid' className='' size='md'>Enviar</Button>
        </div>

      </div>


      <div className='lg:h-2/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between lg:p-2'>
        <p>Reprocessar saldo</p>
        <div className='border-2 w-full lg:h-full flex lg:flex-row items-end justify-between p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[30vw]' />

          <Input variant='underlined' placeholder='Dias' size='sm' className='w-[30vw]' />

          <Button color='primary' variant='solid' className='' size='md'>Enviar</Button>
        </div>

      </div>



      <div className='lg:h-2/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between lg:p-2'>
        <p>Consolidar extrato</p>
        <div className='border-2 w-full lg:h-full flex lg:flex-row items-end justify-between p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[30vw]' />
          <div className='border-2 flex flex-row items-center gap-1 w-2/4'> De: <DatePicker variant='underlined' label={'teste'} />
            Até: <DatePicker variant='underlined' label={'teste'} />

          </div>
          <Button color='primary' variant='solid' className='' size='md'>Enviar</Button>
        </div>

      </div>
</div>
*/
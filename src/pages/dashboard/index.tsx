import axios from 'axios';
import Header from '../../components/Header/index';
import { useEffect, useState } from 'react';
import { TiThumbsUp } from "react-icons/ti";
import { FaThumbsUp } from "react-icons/fa";
import Cookies from 'js-cookie';
import { Button, Spinner } from "@nextui-org/react";
import { Input } from '@nextui-org/react';
import { DatePicker } from '@nextui-org/react';


export default function DashBoard() {
  const [servicesStatus, setServicesStatus] = useState(null);
  const [amountIndicator, setAmountIndicator] = useState(null);
  const [totalMKT, setTotalMKT] = useState(null)
  const [totalProcessado, setTotalProcessed] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [totalProcessedToday, setTotalProcessedToday] = useState(null)
  const [totalProcessedYesterday, setTotalProcessedYesterday] = useState(null)
  const [totalProcesedLastMonth, setTotalProcessedLastMonth] = useState(null)
  const [totalProcessedThirtyDaysBefore, setTotalProcessedThirtyDaysBefore] = useState(null)
  const [totalMarketplaceChildRegistredLastThiryDays, setTotalMarketplaceChildRegistredLastThirtyDays] = useState(null)
  const [totalEstabelecimentsChildRegistredLastThirtyDays, setTotalEstabelecimentsChildRegistredLastThirtyDays] = useState(null)
  const [totalNotProcessedToday, setTotalNotProcessedToday] = useState(null)


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
  function formatarData(dataString: any) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  function formatDateToYYYYMMDD(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // O mês começa de 0 (janeiro é 0)
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const dataAtual = new Date();

  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se o mês for menor que 10
  const dia = String(dataAtual.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se o dia for menor que 10

  const today = `${ano}-${mes}-${dia}`;
  // Exemplo de uso
  const currentDate = new Date(); // Data atual
  const formattedDate = formatDateToYYYYMMDD(currentDate);
  //console.log(formattedDate); // Saída: "yyyy-mm-dd"
  const previousDate = new Date();
  previousDate.setDate(currentDate.getDate() - 30);
  const formattedPreviousDate = formatDateToYYYYMMDD(previousDate);

  const yesterday = new Date(dataAtual)
  yesterday.setDate(currentDate.getDate() - 1)
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se o mês for menor que 10
  const day = String(yesterday.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se o dia for menor que 10
  const yesterdayFormatted = `${year}-${month}-${day}`;



  const lastMonth = new Date(currentDate)
  lastMonth.setMonth(currentDate.getMonth() - 1);
  const yearlasmonth = lastMonth.getFullYear();
  const monthlastMonth = String(lastMonth.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se o mês for menor que 10
  const daylastMonth = String(lastMonth.getDate()).padStart(2, '0');
  const lastMonthFormatted = `${yearlasmonth}-${monthlastMonth}-${daylastMonth}`
  console.log(lastMonthFormatted);
  const previousMonth = new Date(lastMonth);
  previousMonth.setMonth(lastMonth.getMonth() - 1); // Define a data para o mês anterior ao mês anterior

  const yearPreviousMonth = previousMonth.getFullYear();
  const monthPreviousMonth = String(previousMonth.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se o mês for menor que 10
  const dayPreviousMonth = String(previousMonth.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se o dia for menor que 10

  const previousMonthFormatted = `${yearPreviousMonth}-${monthPreviousMonth}-${dayPreviousMonth}`

  useEffect(() => {

    const fetchTotalNotProcessedToday = async () => {
      try {
        const res = await axios.get(`
https://pas-aps.up.railway.app/sale/total-not-processed?startDate=${today}&endDate=${today}`, { headers: { Authorization: `Bearer ${token}` } })
        setTotalNotProcessedToday(res.data)

      }
      catch (error) {
        console.error(error)
      }
    }

    const fetchTotalEstabelecimentsChildRegistredLastThirtyDays = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/establishment/total-registered?startDate=${lastMonthFormatted}&endDate=${today}`, { headers: { Authorization: `Bearer ${token}` } })
        setTotalEstabelecimentsChildRegistredLastThirtyDays(res.data)
      }
      catch (error) {
        console.error(error)
      }

    }

    const fetchTotalMarketplaceChildRegistredLastThirtyDays = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=${lastMonthFormatted}&endDate=${formattedDate}`, { headers: { Authorization: `Bearer ${token}` } });
        setTotalMarketplaceChildRegistredLastThirtyDays(res.data)
      }
      catch (error) {
        console.error(error)
      }
    }

    const fetchTotalProcessedThirtyDaysLater = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/sale/total-processed?startDate=${previousMonthFormatted}&endDate=${lastMonthFormatted}`, { headers: { Authorization: `Bearer ${token}` } })
        setTotalProcessedThirtyDaysBefore(res.data)
      }
      catch (error) {
        console.error(error)
      }
    }

    const fetchTotalProcessedLastThirtyDays = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/sale/total-processed?startDate=${lastMonthFormatted}&endDate=${today}`, { headers: { Authorization: `Bearer ${token}` } })
        setTotalProcessedLastMonth(res.data)

      }
      catch (error) {
        console.error(error)
      }
    }


    const FetchTotalProcessedYesterday = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/sale/total-processed?startDate=${yesterdayFormatted}&endDate=${yesterdayFormatted}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTotalProcessedYesterday(res.data)
      }
      catch (error) {
        console.error(error)
      }
    }

    const fetchsTotalProcessedToday = async () => {
      try {
        const res = await axios.get(`https://pas-aps.up.railway.app/sale/total-processed?startDate=${today}&endDate=${today}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTotalProcessedToday(res.data)


      }
      catch (error) {
        console.error(error)
      }
    }

    /*
        const fetchTotalChild = async () => {
          try {
            const res = await axios.get(`https://pas-aps.up.railway.app/establishment/total-marketplace-child?startDate=&endDate=`, {
             
              //setAlgumacoisa(res.data) 
            })
          }
          catch (error) { console.error(error) }
        } 
    */
    const fetchDataServiceStatus = async () => {
      try {
        const response = await axios.get('https://api.zsystems.com.br/z1/services-status', { headers: { Authorization: `Bearer ${token}` }, });
        setServicesStatus(response.data.services);

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
    FetchTotalProcessedYesterday()
    fetchsTotalProcessedToday()
    fetchTotalProcessedLastThirtyDays()
    fetchTotalProcessedThirtyDaysLater()
    fetchTotalMarketplaceChildRegistredLastThirtyDays()
    fetchTotalEstabelecimentsChildRegistredLastThirtyDays()
    fetchTotalNotProcessedToday()

  }, []);

  // Função para formatar a data para yyyy-mm-dd



  return (<div className=' border-2 h-screen max-w-screen flex flex-col items-center  '>
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
      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total processado Hoje</p>
        {!totalProcessedToday ? (<Spinner />) : (<p>{totalProcessedToday.totalProcessed}</p>)}
      </div>
      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total processado Ontem</p>
        {!totalProcessedYesterday ? (<Spinner />) : (<p>{totalProcessedYesterday.totalProcessed}</p>)}
      </div>

      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total não  processado Hoje</p>
        {!totalNotProcessedToday ? (<Spinner />) : (<p>{totalNotProcessedToday.totalNotProcessed}</p>)}
      </div>




      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total Processado Ultimos 30 dias</p>
        {!totalProcesedLastMonth ? (<Spinner />) : (<p>{totalProcesedLastMonth.totalProcessed}</p>)}
      </div>
      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total 30 dias anteriores</p>
        {!totalProcessedThirtyDaysBefore ? (<Spinner />) : (<p>{totalProcessedThirtyDaysBefore.totalProcessed}</p>)}
      </div>
      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total Marketplaces filhos registrados ultimos 30 dias</p>
        {!totalMarketplaceChildRegistredLastThiryDays ? (<Spinner />) : (<p>{totalMarketplaceChildRegistredLastThiryDays.totalMarketplaceChild}</p>)}
      </div>
      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Total Estabelecimentos filhos registrados ultimos 30 dias</p>
        {!totalEstabelecimentsChildRegistredLastThirtyDays ? (<Spinner />) : (<p>{totalEstabelecimentsChildRegistredLastThirtyDays.totalRegistered}</p>)}
      </div>

      <div className=' w-full border-2 rounded-md flex flex-col items-center justify-center'>
        <p>Service Status</p>
        {!servicesStatus ? (<Spinner />) : (<div><p>{servicesStatus[0].service}</p>

          <p>{formatarData(servicesStatus[0].last_update)}</p>
        </div>)}
      </div>
      <>

        {!servicesStatus ? (<Spinner color='primary' size='lg' />) : (
          <>{
            servicesStatus.map((servicesStatus: any) => (<div>


              <p>{servicesStatus.service}</p>
              <p>{formatarData(servicesStatus.last_update)}</p>
              {servicesStatus.status ? (<>

                <FaThumbsUp color='green' size={50} /></>
              ) : (
                <TiThumbsUp color='red' fill='red' />
              )}



            </div>))
          }
          </>
        )}
      </>
      <div className={`border-2 ${totalNotProcessedToday?.totalNotProcessed > 0 ? 'bg-yellow-400' : 'bg-white'}`}>

        <p>{totalNotProcessedToday?.totalNotProcessed}</p>


      </div>

    </div>

  </div>


  )
}

/*
 <div className='border-2 border-blue-400 w-full lg:h-screen flex  flex-col items-center justify-center  p-4 gap-2'>
      <div className=' h-2/4 lg:h-1/4 border-2 rounded-lg w-full flex flex-col  items-center  justify-center lg:justify-between '>
        <p>Reprocessar venda</p>
        <div className='border-2 w-full h-full flex  flex-col lg:flex-row lg:items-end items-center justify-between gap-2 p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className='w-[50vw] lg:w-[20vw]' />
          <div className='border-2 flex flex-col lg:flex-row items-center gap-1  w-3/4 lg:w-1/4'> De: <DatePicker variant='underlined' label={'teste'} />
            Até: <DatePicker variant='underlined' label={'teste'} />

          </div>
          <Button color='primary' variant='solid' className='' size='lg'>Enviar</Button>
        </div>

      </div>


      <div className='h-2/4 lg:h-1/4 border-2 rounded-lg w-full flex flex-col  items-center justify-between p-4'>
        <p>Reprocessar saldo</p>
        <div className='border-2 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:items-end lg:justify-between gap-2 p-4'>
          <Input variant='underlined' placeholder='ID do estabelecimento' size='sm' className=' w-[50vw] lg:w-[20vw]' />
          <div className='border-2  lg:w-2/4 flex flex-col items-center justify-center'>
            <Input variant='underlined' placeholder='Dias' size='sm' className='w-[50vw]  lg:w-[20vw]' />
          </div>
          <Button color='primary' variant='solid' className='' size='lg'>Enviar</Button>
        </div>

      </div>




    </div>
*/
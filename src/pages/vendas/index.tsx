import Header from "../../components/Header/index"
import { Input, Button } from "@nextui-org/react";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';
import { Spinner, X } from 'phosphor-react'
import { toast } from 'sonner'

export default function Vendas() {
  const [vendaId, setVendaId] = useState('')
  const [responseData, setResponseData] = useState(null);
  const token = Cookies.get('token')
  const handleCleanInput = () => {
    setVendaId('');
    setResponseData(null)
  }
  const handleChange = (e: any) => { setVendaId(e.target.value); }
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.zsystems.com.br/z1/vendas/${vendaId}`,
        { headers: { Authorization: `Bearer ${token}` }, })


      if (response.data.success == true) { setResponseData(response.data) } else { toast.error('Id não encontrado') }






    } catch (error) {

      console.log(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center  h-screen max-w-screen  '>
      <Header />
      <div className='w-full p-4 flex flex-col items-center'>
        <form className=" h-full  w-full lg:w-2/6 p-6 flex flex-col items-center justify-around  lg:px-8 rounded-xl  my-4  shadow-md border-2" >

          <label className=" font-bold">Vendas:</label>
          <Input type='text' placeholder="ID da venda ou zoop transaction ID" variant="underlined" className="w-5/6 lg:w-3/6" onChange={handleChange} value={vendaId} />
          <div className="flex items-center justify-around gap-2  - w-2/6 mt-6">


            <Button onClick={handleSearch} color="primary" variant="shadow">Consultar</Button>
            {vendaId ? (<Button onClick={handleCleanInput} color="danger">Limpar</Button>) : null}

          </div>
        </form>
      </div>
      {responseData ? (






        <div className=" w-full  lg:p-2   text-white">
          <div className=" w-full bg-custom-black flex flex-col   items-center">
            <div className="  w-full flex flex-col items-center">
              <h2>Estabelecimento</h2>
              <p className="text-green-500">{responseData.pedido.estabelecimento.razao_social}</p>
              <h2>Marketplace</h2>
              <p className="text-green-500">{responseData.pedido.estabelecimento.marketplace.nome}</p>
            </div>




            <div className="p-3 border-2 w-full flex flex-col items-center">

              <div className="  flex flex-row gap-2 w-full">
                <p>Valor:</p>
                <p className="text-green-500">R$ {responseData.pedido.pagamentos[0].valor}</p>
              </div>
            </div>

            <div className="border-2  p-3 w-full flex flex-col items-center">
              <div className="  flex flex-row gap-2 w-full">
                <p>Recebido:</p>
                <p className="text-green-500">R$ {responseData.pedido.pagamentos[0].valor_recebido}</p>
              </div>
            </div>


            <div className="border-2  p-3 w-full flex flex-col items-center">
              <div className="  flex flex-row gap-2 w-full">
                <p>Taxa:</p>
                <p className="text-green-500">R$ {responseData.pedido.pagamentos[0].taxa}</p>
              </div>
            </div>




            <div className="border-2  p-3 w-full flex flex-col items-center">
              <div className="  flex flex-row gap-2 w-full">
                <p>Markup:</p>
                <p className="text-green-500">R$ {responseData.pedido.pagamentos[0].markup}</p>
              </div>
            </div>


            <div className='border-2 w-full flex  flex-col  justify-center items-center p-3'>
              <h1>Pagamentos </h1>
              {responseData.pedido.pagamentos[0] ? (<div className='w-full flex flex-row gap-2 p-2'>
                <p>Id:</p>
                <p className='text-green-500'>{responseData.pedido.pagamentos[0].id}</p>
              </div>) : (
                <Spinner color="primary" size='lg' />)}

              {responseData.pedido.status_pedido.titulo ? (<div className='w-full flex flex-row gap-2 p-2'>
                <p>Status:</p>
                <p className='text-green-500'>{responseData.pedido.status_pedido.titulo}</p>
              </div>) : (
                <Spinner color="primary" size='lg' />)}

{responseData.pedido.pagamentos ? (<div className='w-full flex flex-row gap-2 p-2'>
                <p>Data de Recebimento:</p>
                <p className='text-green-500'>{ new Date(responseData.pedido.pagamentos[0].data_recebimento).toLocaleString('pt-BR', { timeZone: 'UTC' })}</p>
              </div>) : (
                <Spinner color="primary" size='lg' />)}



            </div>
                

            {responseData.pedido.pedidos_splits[0] ? (
              <div className="border-2 p-3 w-full flex flex-col items-center">
                <div className="flex flex-row gap-2 w-full">
                  <p>Markup:</p>
                  <p className="text-green-500">R$ {responseData.pedido.pedidos_splits[0]}</p>
                </div>
              </div>
            ) : null}






          </div>




          <div className=" bg-gray-400  max-w-full text-sm  grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 ">
            <div className=" w-full text-left p-2 lg:p-4 ">
              <p>Vendas</p>
              <JSONPretty data={responseData.pedido} theme={{ JSONPrettyMon }} />
            </div>
            <div className=" w-full text-left lg:border-2 lg:rounded-3xl  p-2 lg:p-4">
              <p>Zoop Transactions</p>
              <JSONPretty className=" roundead-xl " data={responseData.zoopTransaction} theme={{ JSONPrettyMon }} />
            </div>
          </div>
        </div>
      ) : null}


    </div>

  )
}

/*
  <div className="rounded-lg  bg-gray-500 h-full  flex flex-col lg:flex-row   items-center lg:items-start p-4 lg:pt-8 justify-center ">
            <div className=" w-2/6 flex flex-col items-center justify-center lg:gap-2 ">
              <p>Marketplace: {responseData.pedido.estabelecimento.marketplace.nome}</p>
              <p>Valor: {responseData.pedido.valor_bruto}</p>
              <p>Valor liquido: {responseData.pedido.valor_liquido}</p>
              <p>Taxa Custo: {responseData.pedido.pagamentos[0].taxa}</p>
              <p>Markup: {responseData.pedido.pagamentos[0].markup}</p>
            </div>
            <div className="w-2/6 flex flex-col items-center justify-center lg:gap-2">
              <h1>Pagamentos</h1>
              <p>Id: {responseData.pedido.pagamentos[0].id}</p>
              <p>Status: {responseData.pedido.status_pedido.titulo}</p>
              <p>Valor: {responseData.pedido.pagamentos[0].valor}</p>
              <p>Taxa: {responseData.pedido.pagamentos[0].taxa}</p>
              <p>Recebido: {responseData.pedido.pagamentos[0].valor_recebido}</p>
              <Button color="warning">Reprocessar venda</Button>
            </div>
            <div className="w-2/6 flex flex-col items-center justify-center lg:gap-2">
              <h1>Estabelecimento</h1>
              <p>{responseData.pedido.estabelecimento.razao_social}</p>
              <p>Bandeira: {responseData.zoopTransaction.payment_method.card_brand}</p>
              <p>Parcelas: {responseData.pedido.parcelas}</p>
              <p>Forma de pagamento: {responseData.zoopTransaction.payment_type}</p>

            </div>

          </div > */
import Header from "../../components/Header/index"
import { Input, Button } from "@nextui-org/react";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import { Spinner, X } from 'phosphor-react'


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
      setResponseData(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(responseData)
  return (
    <div className='flex flex-col items-center  h-screen w-screen  '>
      <Header />
      <form className=" h-3/8  w-full lg:w-2/6 p-6 flex flex-col items-center justify-around  lg:px-8 rounded-xl  my-4 shadow-md border-2" >
        <label className=" font-bold">Vendas:</label>
        <Input type='text' placeholder="ID da venda ou zoop transaction ID" variant="underlined" className="w-5/6 lg:w-3/6" onChange={handleChange} value={vendaId} />
        <div className="flex items-center justify-around  w-2/6 mt-6">
          <Button onClick={handleSearch} color="primary" variant="shadow">Consultar</Button>
          {vendaId ? (<Button onClick={handleCleanInput} color="danger">Limpar</Button>) : null}

        </div>
      </form>
      {!responseData ? (<Spinner />) : (
        <div className=" rounded-lg   border-black w-full h-full  p-2 lg:p-4  text-black">
          <div className="rounded-lg  bg-gray-500 h-full gap-3 flex flex-col lg:flex-row   items-center lg:items-start lg:p-20 justify-center ">
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
          </div>














        </div>
      )}


    </div>

  )
}
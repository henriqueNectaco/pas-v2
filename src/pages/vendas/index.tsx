import Header from '../../components/Header/index'
import { Input, Button } from '@nextui-org/react'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css'
import JSONPretty from 'react-json-pretty'
import { Spinner, X } from 'phosphor-react'
import { toast } from 'sonner'
import Router from 'next/router'


export default function Vendas() {
  const [vendaId, setVendaId] = useState('')
  const [responseData, setResponseData] = useState(null)
  const token = Cookies.get('token')
  const handleCleanInput = () => {
    setVendaId('')
    setResponseData(null)
  }
  const handleChange = (e: any) => {
    setVendaId(e.target.value)
  }
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.zsystems.com.br/z1/vendas/${vendaId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.data.success == true) {
        setResponseData(response.data)
      } else {
        toast.error('Id não encontrado')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axios.post(`https://api.zsystems.com.br/z1/autenticar`, { token: token })
        if (res.data.success === true) {



        } else {
          toast.error('Sua sessão expirou faça login novamente')
          Router.push('/')

        }
      }
      catch (error) {
        console.error(error)
      }

    }
    auth()

  }, [])

  return (
    <div className="flex flex-col items-center  h-screen max-w-screen w-full ">
      <Header />
      <div className='w-full max-w-screen flex flex-col space-y-2 '>
        <div className="w-full p-4 flex lg:flex-row flex-col items-center gap-2  justify-center h-full">
          <form className=" h-full  w-full lg:w-2/6 p-6 flex flex-col items-center justify-around  lg:px-8 sm:rounded-xl  my-4  shadow-md border-2">
            <label className=" font-bold">Vendas:</label>
            <Input
              type="text"
              placeholder="ID da venda ou zoop transaction ID"
              variant="underlined"
              className="w-5/6 lg:w-3/6"
              onChange={handleChange}
              value={vendaId}
            />
            <div className="flex  items-center justify-center lg:justify-around gap-2   w-2/6  mt-4 lg:mt-6">
              <Button onClick={handleSearch} color="primary" variant="shadow">
                Consultar
              </Button>
              {vendaId ? (
                <Button onClick={handleCleanInput} color="danger">
                  Limpar
                </Button>
              ) : null}
            </div>
          </form>
          {responseData ? (
            <div className=' bg-mygray p-4 lg:w-4/6 gap-4 w-full h-full flex flex-col lg:grid lg:grid-cols-2'>
             
              <div className=' h-full w-full space-y-4  text-white'>
              <div className=''>
<h1 className='font-bold'>Marketplace</h1>
<p>{responseData.pedido.estabelecimento.marketplace.nome}</p>

              </div>

              <div className=' pr-2'>
                <div className='   flex  flex-row items-start justify-between'> 
                  <p>Valor</p>
                  <p>{responseData.pedido.valor_bruto}</p>
                </div>
                <div className='   flex flex-col lg:flex-row items-start justify-between'> 
                  <p>Valor liquido</p>
                  <p>{responseData.pedido.valor_liquido}</p>
                </div>
                <div className='   flex  flex-row items-start justify-between'> 
                  <p>Taxa Custos</p>
                  <p>{responseData.pedido.pagamentos[0].taxa}</p>
                </div>
                <div className='   flex flex-row items-start justify-between'> 
                  <p>Markup</p>
                  <p>{responseData.zoopTransaction.payment_method.card_brand}</p>
                </div>
                <div className='   flex flex-row items-start justify-between'> 
                  <p>Tabela de Markup</p>
                  <p>{responseData.pedido.pagamentos[0].markup}</p>
                </div>
                <div className='   flex flex-row items-start justify-between'> 
                  <p>Splits</p>
                  <p>?</p>
                </div>
                </div>


              
<div>



              </div>
              </div>



              <div className=' h-full w-full space-y-4  text-white'>

                
             <div>
             <h1 className='font-bold'>Estabelecimento</h1>
              <p>{responseData.pedido.estabelecimento.razao_social} </p>
             </div>

              <div className=' pr-2'>
                <div className='   flex  flex-row items-start justify-between'> 
                  <p>Status</p>
                  <p>{responseData.pedido.status_pedido.titulo}</p>
                </div>
                <div className='   flex flex-col lg:flex-row items-start justify-between'> 
                  <p>Data</p>
                  <p></p>
                </div>
                <div className='   flex  flex-row items-start justify-between'> 
                  <p>Forma de pagamento</p>
                  <p>{responseData.zoopTransaction.payment_type}</p>
                </div>
                <div className='   flex flex-row items-start justify-between'> 
                  <p>Bandeira</p>
                  <p>{responseData.zoopTransaction.payment_method.card_brand}</p>
                </div>
                <div className='   flex flex-row items-start justify-between'> 
                  <p>Parcelas</p>
                  <p>{responseData.pedido.parcelas}</p>
                </div>
                </div>

              </div>


            </div>


          ) : null}
        </div>
        {responseData ? (<div className='p-2'>
          <div className='w-full flex flex-col items-center lg:items-start justify-center gap-2  bg-white shadow-lg border-2 p-4  '>
            <h1 className='font-bold'>Pagamentos</h1>



            <div className='lg:grid lg:grid-cols-5 flex flex-col items-center justify-center  w-full space-y-2 space-x-2'>

              <div className='flex flex-col space-y-2 items-center lg:items-start justify-center p-4 lg:pl-0'>
                <p className='font-bold'>ID {responseData.pedido.id}</p>
                <p>Status:  {responseData.pedido.status_pedido.titulo}</p>
                <p>Valor</p>  
                <p>R$ {responseData.pedido.pagamentos[0].valor}</p>
                <p>DR</p>
                <p>  {new Date(
                  responseData.pedido.pagamentos[0].data_recebimento,
                ).toLocaleString('pt-BR', { timeZone: 'UTC' })}</p>
              </div>


              <div className='flex flex-col  items-center justify-center  w-full h-full p-4'>
                <p>Taxa</p>
                <p>R$ {responseData.pedido.pagamentos[0].taxa}</p>

              </div>
              <div className='flex flex-col  items-center justify-center  h-full w-full'>

                <p>Recebido </p>
                <p>R$ {responseData.pedido.pagamentos[0].valor_recebido}</p>

              </div>


              <div className='flex flex-col  items-center justify-center  h-full w-full'>
                <p>DP</p>
                <p>-</p>


              </div>
              <div className='flex flex-col  items-center lg:justify-end  h-full w-full p-4'>
                <Button color='danger' size='md'>Reprocessar venda</Button>

              </div>



            </div>
          </div>
          </div>

        ) : null}
        {responseData ? (<div className=" bg-black  max-w-full text-sm  grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 ">
          <div className=" w-full text-left p-2  ">
            <p className='text-white'>Vendas</p>
            <JSONPretty
              data={responseData.pedido}
              theme={{ JSONPrettyMon }}
            />
          </div>
          <div className=" w-full text-left  p-2  ">
            <p className='text-white'>Zoop Transactions</p>
            <JSONPretty
              className=" roundead-xl "
              data={responseData.zoopTransaction}
              theme={{ JSONPrettyMon }}
            />
          </div>
        </div>) : null}

      </div>

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
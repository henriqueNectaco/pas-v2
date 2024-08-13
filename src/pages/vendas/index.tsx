import { Button } from '@nextui-org/react'
import axios from 'axios'
import { formatarData } from '@/utils/dates'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import JSONPrettyMon from 'react-json-pretty/themes/monikai.css'
import JSONPretty from 'react-json-pretty'
import FormVendas from './form'
import { toast } from 'sonner'
import Router from 'next/router'
import { typeResponseData, ZoopTransaction } from '@/lib/types/vendas'
import { apiUrl } from '../api/useApi'
import PagamentosCards from './pagamentosCards'
import { arrayOfObjectsSum } from '@/lib'

export default function Vendas() {
  //require('dotenv').config()
  //const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [isLoadingSearchSale, setIsLoadingSearchSale] = useState<boolean>(false)
  const [isLoadingReprocessSale, setIsLoadingReprocessSale] = useState<boolean>(false)
  const [vendaId, setVendaId] = useState<string | undefined>(undefined)
  const [responseData, setResponseData] = useState<typeResponseData | null>(null)
  const [responseZoopTransaction, setResponseZoopTransaction] =
    useState<ZoopTransaction>(null)
  const token = Cookies.get('token')
  const handleCleanInput = () => {
    setVendaId('')
    setResponseData(null)
    setIsLoadingSearchSale(false)
  }
  const handleReprocessSale = async () => {
    setIsLoadingReprocessSale(true)
    try {
      const response = await axios.get(`${apiUrl}/vendas/${responseData?.id}/reprocessar`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success === true) {
        toast.success('Pedido Adicionado a fila de reprocessamento')
        setIsLoadingReprocessSale(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleSearch = async () => {
    setIsLoadingSearchSale(true)
    try {
      if (vendaId === '') {
        toast.error('Preencha o  campo ID da venda')
        setIsLoadingSearchSale(false)
      } else {
        const response = await axios.get(
          `${apiUrl}/vendas/${vendaId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )

        if (response.data.success === true) {
          setResponseData(response.data.pedido)
          setResponseZoopTransaction(response.data.zoopTransaction)
          setIsLoadingSearchSale(false)
        } else {
          setIsLoadingSearchSale(false)
          toast.error('Id não encontrado')
          setIsLoadingSearchSale(false)
        }
      }

    } catch (error) {
      console.error(error)
      setIsLoadingSearchSale(false)

    }


  }
  const auth = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/autenticar`,
        { token },
      )
      if (res.data.success === false) {
        toast.error('Sua sessão expirou faça login novamente')
        Router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    auth()
  }, [])


  const splits = responseData?.pedidos_splits || [];
  const somaSplits = arrayOfObjectsSum(splits, 'valor');




  return (
    <div className="flex flex-col items-center  h-screen max-w-screen w-full ">

      <div className={`w-full max-w-screen flex flex-col space-y-2 ${responseData?.pagamentos.length > 1 && 'bg-gray-800'} ${responseData !== null && responseData.pagamentos.length == 1 ? 'bg-gray-300' : ''}`}>
        <div className="w-full lg:p-3 p-2 lg:pr-0 flex lg:flex-row flex-col items-center lg:gap-4  justify-center h-full">
          <FormVendas onSubmit={handleSearch}
            Isloading={isLoadingSearchSale}
            handleCleanInput={handleCleanInput}
            vendaId={vendaId}
            setInputIdDaVenda={setVendaId}
            handleSearch={handleSearch}
          />
          {responseData ? (
            <div className=" bg-mygray p-4 lg:w-4/6 gap-4 w-full h-full flex flex-col lg:grid lg:grid-cols-2">
              <div className=" h-full w-full space-y-4  text-white">
                <div className="flex flex-col">
                  <h1 className="font-bold">Marketplace</h1>
                  <p>{responseData.estabelecimento.marketplace.nome}</p>
                </div>

                <div className=" pr-2">
                  <div className="   flex  flex-row items-start justify-between">
                    <p>Valor</p>
                    <p>{responseData.valor_bruto}</p>
                  </div>
                  <div className="   flex flex-col lg:flex-row items-start justify-between">
                    <p>Valor liquido</p>
                    <p>{responseData.valor_liquido}</p>
                  </div>
                  <div className="   flex  flex-row items-start justify-between">
                    <p>Taxa Custos</p>
                    <p>

                      {/* {responseData.pagamentos[0].taxa}</p> */}
                      teste
                    </p></div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Markup</p>
                    <p>{responseZoopTransaction.payment_method.card_brand}</p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Tabela de Markup</p>
                    <p>
                      {/* {responseData.pagamentos[0].markup} */}
                      teste
                    </p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Splits</p>
                    <p>{responseData.pedidos_splits.length === 0 ? 0 : (
                      somaSplits
                    )}
                      {/* {responseData.pedidos_splits.length} */}
                    </p>
                  </div>
                </div>

                <div></div>
              </div>

              <div className=" h-full w-full space-y-4  text-white">
                <div>
                  <h1 className="font-bold">Estabelecimento</h1>
                  <p>{responseData.estabelecimento.razao_social} </p>
                </div>

                <div className=" pr-2">
                  <div className="   flex  flex-row items-start justify-between">
                    <p>Status</p>
                    <p
                      className={`${responseData.status_pedido.titulo === 'Aprovado' ? 'text-green-500' : responseData.status_pedido.titulo === 'Pendente ' ? 'text-yellow-500' : 'text-red-500'}`}
                    >
                      {responseData.status_pedido.titulo}{' '}
                    </p>
                  </div>
                  <div className="   flex flex-col lg:flex-row items-start justify-between">
                    <p>Data</p>
                    <p>{formatarData(responseZoopTransaction.created_at)}</p>
                  </div>
                  <div className="   flex  flex-row items-start justify-between">
                    <p>Forma de pagamento</p>
                    <p>{responseZoopTransaction.payment_type}</p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Bandeira</p>
                    <p>{responseZoopTransaction.payment_method.card_brand}</p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Parcelas</p>
                    <p>{responseData.parcelas}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {responseData ? (
          <div className={`${responseData.pagamentos.length == 1 ? 'p-3 lg:pr-0' : ''}`}>
            <div
              className={`"w-full max-w-screen flex  ${responseData.pagamentos.length >= 3 ? '' : 'bg-white rounded-lg p-2'}    flex-col items-center  justify-center "`}
            >
              {responseData.pagamentos.length <= 1 ? (
                <>
                  <h1 className="font-bold w-full flex items-center justify-center pt-2">
                    Pagamentos
                  </h1>
                  <div className="lg:grid lg:grid-cols-5 flex flex-col items-center justify-center  w-full ">
                    <div className="flex flex-col space-y-2 items-center lg:items-start justify-center p-4 lg:pl-0 ">
                      <p className="font-bold">ID {responseData.id}</p>

                      <div className="gap-1 flex flex-row items-center  justify-center lg:justify-between">
                        <p>Status:</p>
                        <p
                          className={`${responseData.status_pedido.titulo === 'Aprovado' ? 'text-green-500' : responseData.status_pedido.titulo === 'Pendente ' ? 'text-yellow-500' : 'text-red-500'}`}
                        >
                          {responseData.status_pedido.titulo}
                        </p>
                      </div>

                      <p>Valor</p>
                      <p>
                        R$
                        {/* {responseData.pagamentos[0].valor} */}
                      </p>
                      <p>Data Recebimento</p>
                      <p>
                        teste
                        {/* {new Date(
                          responseData.pagamentos[0].data_recebimento,
                        ).toLocaleString('pt-BR', { timeZone: 'UTC' })} */}
                      </p>
                    </div>

                    <div className="flex flex-col  items-center justify-center  w-full h-full p-4">
                      <p>Taxa</p>
                      <p>R$
                        {/* {responseData.pagamentos[0].taxa} */}
                        teste
                      </p>
                    </div>
                    <div className="flex flex-col  items-center justify-center  h-full w-full">
                      <p>Recebido </p>
                      <p>R$
                        {/* {responseData.pagamentos[0].valor_recebido} */}
                        teste
                      </p>
                    </div>

                    <div className="flex flex-col  items-center justify-center  h-full w-full">
                      <p>DP</p>
                      <p>-</p>
                    </div>
                    <div className="flex flex-col  items-center lg:justify-center  h-full w-full p-4">
                      <Button
                        color="danger"
                        size="md"
                        onClick={async () => {
                          try {
                            const res = await axios.get(
                              `https://api.zsystems.com.br/z1/vendas/${responseData.id}/reprocessar`,
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              },
                            )
                            if (res.data.success === true) {
                              toast.success(
                                'Adicionado a fila de reprocessamento',
                              )
                            } else {
                              toast.warning(res.data.error)
                            }
                          } catch (error) {
                            console.error(error)
                          }
                        }}
                      >
                        Reprocessar vendas
                      </Button>
                    </div>
                  </div>
                </>

              ) : null}
            </div>
            <div className="w-full lg:gap-0 gap-2">
              {responseData.pagamentos.length > 1 ? (
                <PagamentosCards reprocessSale={handleReprocessSale}
                  isLoadingReprocessSale={isLoadingReprocessSale}
                  currentComponent={'pagamentos'}
                  titulo={'Pagamentos'}
                  arrayTittles={[
                    'Id',
                    'Status',
                    'Valor',
                    'Taxa',
                    'Recebido',
                    'Data Recebimento',
                    'DP',
                  ]}
                  dados={responseData.pagamentos}
                  contentArray={[
                    'id',
                    'status_pagamento_id',
                    'valor',
                    'taxa',
                    'valor_recebido',
                    'data_recebimento',
                  ]}
                />
              ) : null}

              {responseData.pedidos_splits.length >= 1 ? (
                <PagamentosCards isLoadingReprocessSale={isLoadingReprocessSale}
                  reprocessSale={handleReprocessSale}
                  currentComponent={'splits'}
                  titulo={'Splits'}
                  arrayTittles={['Id', 'Estabelecimento', 'Tipo', 'Categoria', 'Valor',]}
                  contentArray={['id', 'nome_fantasia', 'id', 'id', 'valor']} dados={responseData.pedidos_splits}
                />
              ) : null}
            </div>
          </div>

        ) : null}
        {responseData ? (
          <div className=" bg-gray-800    max-w-full text-sm  grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 ">
            <div className=" w-full text-left p-2  space-y-2 lg:space-y-4">
              <p className="text-white">Vendas</p>
              <JSONPretty data={responseData} theme={{ JSONPrettyMon }} />
            </div>
            <div className=" w-full text-left  p-2 pr-0 space-y-2 lg:space-y-4 ">
              <p className="text-white">Zoop Transactions</p>
              <JSONPretty
                className=" roundead-xl "
                data={responseZoopTransaction}
                theme={{ JSONPrettyMon }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div >
  )
}

/*  function status_payment(statusPaymentId: number) {
    switch (statusPaymentId) {
      case 1:
        return 'Aprovado'
      case 2:
        return 'Pendente'
      case 3:
        return 'Negado'
    }
  }
 */
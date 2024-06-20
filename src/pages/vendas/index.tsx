import Header from '../../components/Header/index'
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
import { ZoopTransaction, Pedido } from '@/types/vendas/vendas'
import SplitsCards from './splits'
import PagamentosCards from './pagamentosCards'

export default function Vendas() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [vendaId, setVendaId] = useState<string | undefined>(undefined)
  const [responseData, setResponseData] = useState<Pedido | null>(null)
  const [responseZoopTransaction, setResponseZoopTransaction] =
    useState<ZoopTransaction>(null)
  const token = Cookies.get('token')
  const handleCleanInput = () => {
    setVendaId('')
    setResponseData(null)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://api.zsystems.com.br/z1/vendas/${vendaId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.data.success === true) {
        setResponseData(response.data.pedido)
        setResponseZoopTransaction(response.data.zoopTransaction)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toast.error('Id não encontrado')
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      if (vendaId === '') {
        toast.error('Preencha o  campo ID da venda')
      }
    }
  }

  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axios.post(
          `https://api.zsystems.com.br/z1/autenticar`,
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
    auth()
  }, [])
  function status_payment(statusPaymentId: number) {
    switch (statusPaymentId) {
      case 1:
        return 'Aprovado'
      case 2:
        return 'Pendente'
      case 3:
        return 'Negado'
    }
  }
  return (
    <div className="flex flex-col items-center  h-screen max-w-screen w-full ">
      <Header />
      <div className="w-full max-w-screen flex flex-col space-y-2 ">
        <div className="w-full lg:p-3 p-2 lg:pr-0 flex lg:flex-row flex-col items-center lg:gap-4  justify-center h-full">
          <FormVendas
            Isloading={isLoading}
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
                    <p>{responseData.pagamentos[0].taxa}</p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Markup</p>
                    <p>{responseZoopTransaction.payment_method.card_brand}</p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Tabela de Markup</p>
                    <p>{responseData.pagamentos[0].markup}</p>
                  </div>
                  <div className="   flex flex-row items-start justify-between">
                    <p>Splits</p>
                    <p>?</p>
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
          <div className=" ">
            <div
              className={`"w-full flex  ${responseData.pagamentos.length >= 3 ? '' : 'lg:border-2'}  flex-col items-center ${responseData.pagamentos.length >= 3 ? 'lg:items-center' : 'lg:items-start'} justify-center gap-2      "`}
            >
              <h1 className="font-bold">Pagamentos</h1>
              {responseData.pagamentos.length <= 1 ? (
                <div className="lg:grid lg:grid-cols-5 flex flex-col items-center justify-center  w-full space-y-2   space-x-2">
                  <div className="flex flex-col space-y-2 items-center lg:items-start justify-center p-4 lg:pl-0 ">
                    <p className="font-bold">ID {responseData.id}</p>

                    <div className="gap-1 flex flex-row items-center  justify-center lg:justify-between">
                      <p>Status:</p>
                      <p
                        className={`${responseData.status_pedido.titulo === 'Aprovado' ? 'text-green-500' : responseData.status_pedido.titulo === 'Pendente ' ? 'text-yellow-500' : 'text-red-500'}`}
                      >
                        {responseData.status_pedido.titulo}{' '}
                      </p>
                    </div>

                    <p>Valor</p>
                    <p>R$ {responseData.pagamentos[0].valor}</p>
                    <p>Data Recebimento</p>
                    <p>
                      {' '}
                      {new Date(
                        responseData.pagamentos[0].data_recebimento,
                      ).toLocaleString('pt-BR', { timeZone: 'UTC' })}
                    </p>
                  </div>

                  <div className="flex flex-col  items-center justify-center  w-full h-full p-4">
                    <p>Taxa</p>
                    <p>R$ {responseData.pagamentos[0].taxa}</p>
                  </div>
                  <div className="flex flex-col  items-center justify-center  h-full w-full">
                    <p>Recebido </p>
                    <p>R$ {responseData.pagamentos[0].valor_recebido}</p>
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
              ) : null}
              <div className="w-full lg:gap-0 gap-2">
                {responseData.pagamentos.length > 1 ? (
                  <PagamentosCards
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
                  <PagamentosCards
                    currentComponent={'splits'}
                    titulo={'Splits'}
                    arrayTittles={[
                      'Id',
                      'Estabelecimento',
                      'Tipo',
                      'Categoria',
                      'Valor',
                    ]}
                    contentArray={['id', 'nome_fantasia', 'id', 'id', 'valor']}
                    dados={responseData.pedidos_splits}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {responseData ? (
          <div className=" bg-black  max-w-full text-sm  grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 ">
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
    </div>
  )
}

/*
 */

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/04YR81o54JE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Button } from '@nextui-org/button'
import { typeServices, TypePropsDashComponent } from '@/types/dashboard'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Input } from '@nextui-org/input'
import DateRangePickerComponent from '../../components/rangedatepicker/index'
import { Spinner } from '@nextui-org/react'

import React, { ChangeEvent } from 'react'
import { Article, CurrencyDollar } from 'phosphor-react'
import { formatarData } from '@/lib/sum'
export default function DashComponent(props: TypePropsDashComponent) {
  return (
    <>
      <div className="flex flex-col gap-6  p-2 lg:p-0 h-full   ">
        <div className="lg:grid lg:grid-cols-3 md:grid-cols-3 gap-4 lg:gap-6 flex flex-col  ">
          <Card className="flex-1 shadow-md  border-gray-400 bg-gray-100">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <CodeIcon className="h-6 w-6 text-blue-500" />
                  <span>Services Status</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center  gap-4 p-4">
              {!props.servicesStatus ? (
                <Spinner size="lg" />
              ) : (
                <>
                  {props.servicesStatus.map((services: typeServices) => (
                    <div
                      className="flex items-center justify-between"
                      key={services.id}
                    >
                      <span className="font-semibold">{services.service}</span>
                      <div className="flex items-center">
                        <CheckIcon
                          className={`${services.status === true ? 'text-green-500' : 'text-red-500'}`}
                        />
                        <span className="ml-2 text-gray-500">
                          {formatarData(services.last_update)}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
          <Card className="flex-1 shadow-md  border-gray-400 bg-gray-100">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Article size={32} />

                  <span>Pedidos & Pagamentos</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-4">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Pedidos Processados Hoje/Ontem
                </span>
                {!props.data.totalProcessadoHoje ||
                !props.data.totalProcessadoOntem ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-gray-500 flex lg:flex-row ">
                    <p>{props.data.totalProcessadoHoje}</p>
                    <p>/</p>
                    <p>{props.data.totalProcessadoOntem}</p>
                  </span>
                )}
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-semibold">
                  Pedidos Processados Mês Atual/Mês Anterior
                </span>
                {!props.data.totalProcessadoMesAtual ||
                !props.data.totalProcessadoMesAnterior ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-gray-500 flex lg:flex-row   ">
                    <p>{props.data.totalProcessadoMesAtual}</p>
                    <p>/</p>
                    <p>{props.data.totalProcessadoMesAnterior}</p>
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Pedidos Não Pagos Hoje/Ontem
                </span>
                <span className="text-gray-500">0/0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Pedidos Não Pagos na Última Semana
                </span>
                <span className="text-gray-500">0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Pedidos Não Processados Hoje/Ontem
                </span>
                {!props.data.totalNaoProcessadoHoje &&
                !props.data.totalNaoProcessadoOntem ? (
                  <Spinner size="sm" />
                ) : (
                  <div className="flex flex-row lg:gap-1 ">
                    <p
                      className={`${(props.data.totalNaoProcessadoHoje ?? 0) > 0 ? 'text-yellow-400' : 'text-gray-50'}`}
                    >
                      {props.data.totalNaoProcessadoHoje}
                    </p>
                    <p>/</p>
                    <span
                      className={`${(props.data.totalNaoProcessadoOntem ?? 0) > 0 ? 'text-yellow-400' : 'text-gray-50'}`}
                    >
                      {props.data.totalNaoProcessadoOntem}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 shadow-md bg-gray-100  border-gray-400">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <CurrencyDollar color="green" size={32} />
                  <span>Vendas & Registros</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-4">
              <div className="flex justify-between">
                <span className="font-semibold">Vendas</span>
                {!props.data.numVendas ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-gray-500">{props.data.numVendas}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Valor Total de Vendas</span>
                {!props.data.totalVendido ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-gray-500">
                    {props.data.totalVendido}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">SSLs Este Mês/Último Mês</span>
                <span className="text-gray-500">1/2</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Marketplaces filhos Registrados ultimos 30 dias
                </span>
                {!props.data.totalMarketplaceChildResgiteredLastThirtyDays ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-gray-500">
                    {props.data.totalMarketplaceChildResgiteredLastThirtyDays}
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Estabelecimentos Filhos Registrados ultimos 30 dias
                </span>
                {!props.data
                  .totalEstabelecimentosFilhosRegistradosUltimosTrintaDias ? (
                  <Spinner size="sm" />
                ) : (
                  <span className="text-gray-500">
                    {
                      props.data
                        .totalEstabelecimentosFilhosRegistradosUltimosTrintaDias
                    }
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
          <div className=" grid col-span-2 grid-rows-2 gap-2 lg:gap-5 mt-4 ">
            <div className="  flex  flex-col items-center lg:grid lg:grid-cols-2 lg:items-end justify-center lg:pl-0  p-4 lg:pb-2 lg:pr-0 gap-2 lg:gap-4">
              <div className="lg:w-full w-full items-end justify-center   ">
                <Input
                  type="number"
                  className=" text-sm"
                  placeholder="Digite o ID do Estabelecimento"
                  variant="underlined"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.idEstabelecimentoReprocessarVenda(e.target.value)
                  }}
                />
              </div>
              <div className="w-full lg:w-full flex flex-col lg:flex-row items-center    h-full lg:items-end gap-2  ">
                <DateRangePickerComponent
                  value={props.value}
                  setValue={props.setValue}
                  variant={'underlined'}
                />
                <Button
                  isLoading={props.isLoadingReprocessarVenda}
                  className=""
                  fullWidth
                  color="primary"
                  onClick={props.reprocessarVenda}
                  isDisabled={props.isDisabledReprocessSale}
                >
                  Reprocessar Venda
                </Button>
              </div>
            </div>
            <div className=" rounded-md flex  flex-col items-center lg:grid lg:grid-cols-2 lg:items-end justify-center p-4 lg:pb-2 lg:pr-0   lg:pl-0 gap-2   lg:gap-4">
              <div className="items-end w-full ">
                <Input
                  placeholder="Digite o ID do Estabelecimento"
                  variant="underlined"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.idEstabelecimentoReprocessarSaldo(e.target.value)
                  }}
                  type="number"
                />
              </div>
              <div className="w-full flex lg:flex-row flex-col items-center lg:justify-between  lg:items-end  gap-2">
                <Input
                  type="number"
                  className=""
                  placeholder="Dias"
                  variant="underlined"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.inputDias(e.target.value)
                  }}
                />

                <Button
                  className=" text-white "
                  isLoading={props.isLoadingReprocessarSaldo}
                  color="primary"
                  fullWidth={true}
                  onClick={props.reprocessarSaldo}
                  isDisabled={props.isDisabledReprocessarSaldo}
                >
                  Reprocessar Saldo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, prettier/prettier
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

// function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="8" cy="21" r="1" />
//       <circle cx="19" cy="21" r="1" />
//       <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
//     </svg>
//   )
// }

/*
  <CardContent className="grid grid-cols-1 gap-4 p-4">
<PizzaIcon className="h-6 w-6 text-indigo-600" />

            {props.servicesStatus.map(() => ( 
                <div key={props.id}>
                  <p>{props.serviceName}</p>
                  <CheckIcon className="text-green-500" />
                  <p>{props.last_update}</p>
                  <p>rtes</p>

                </div>
              ))}
            </CardContent>
            
            <ShoppingCartIcon className="h-6 w-6 text-indigo-600" />
            function PizzaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 11h.01" />
      <path d="M11 15h.01" />
      <path d="M16 16h.01" />
      <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
      <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
    </svg>
  )
}
            
            */

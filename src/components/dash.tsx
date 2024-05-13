/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/04YR81o54JE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link'
import {Button} from '@nextui-org/button'
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@/components/ui/popover'
import { Avatar } from '@/components/ui/avatar'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Input } from '@nextui-org/input'
import { Calendar } from '@/components/ui/calendar'
import { Spinner } from '@nextui-org/react'
type PropsType = {
  
  servicesStatus:any
  processadosHoje:number
  processadosOntem:number
processadosMesAtual:number
processadosMesAnterior:number
naoProcessadosOntem :number
naoProcessadosHoje:number
vendas:number
totalVendido:number
marketplacesCadastradosUltimos30dias:number
estabelecimentosFilhosRegistradosUltimos30dias:number
}
function formatarData(dataString: any) {
  const data = new Date(dataString)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  const horas = String(data.getHours()).padStart(2, '0')
  const minutos = String(data.getMinutes()).padStart(2, '0')

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`
}

export default function DashComponent(props: PropsType ) {
  return (
    <>
      <div className="flex flex-col gap-6 lg:p-4 p-2   ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 ">
          <Card className="flex-1 shadow-md bg-white ">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <CodeIcon className="h-6 w-6 text-indigo-600" />
                  <span>Services Status</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center  gap-4 p-4">
          {!props.servicesStatus ? (<Spinner  size='lg'/>):(
<>

{props.servicesStatus.map((services) => ( 
                <div className='flex items-center justify-between' key={services.id}>
                  <span className="font-semibold">{services.service}</span>
                  <div className="flex items-center">
                  <CheckIcon className="text-green-500" />
                  <span className="ml-2 text-gray-500">{formatarData(services.last_update)}</span>
                  </div>
                  </div>
              ))}
</>
)}
           
            </CardContent>
          
          </Card>
          <Card className="flex-1 shadow-md bg-white ">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-6 w-6 text-indigo-600" />
                  <span>Pedidos & Pagamentos</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-4">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Pedidos Processados Hoje/Ontem
                </span>
                {!props.processadosOntem || !props.naoProcessadosHoje ? (<Spinner size='sm'/>):
                (
                  <span className="text-gray-500">{props.processadosHoje}/{props.processadosOntem}</span>  
                )}
                
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Pedidos Processados Mês Atual/Mês Anterior
                </span>
                {!props.processadosMesAtual || !props.processadosMesAnterior ? (<Spinner size='sm'/>):
                (
<span className="text-gray-500">{props.processadosMesAtual}/{props.processadosMesAnterior}</span>
                )

                }
                
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
{!props.naoProcessadosHoje || !props.naoProcessadosOntem ?(<Spinner size='sm'/>):
( <div className='flex flex-row'><p className={`${props.naoProcessadosHoje > 0 ? 'text-yellow-400' : 'text-gray-50'}`}>{props.naoProcessadosHoje}</p>
/
<span className={`${props.naoProcessadosOntem > 0 ? 'text-yellow-400' : 'text-gray-50'}`}>{props.naoProcessadosOntem}</span> </div>)}

            
               
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 shadow-md bg-gray-50">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <PizzaIcon className="h-6 w-6 text-indigo-600" />
                  <span>Vendas & Registros</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 p-4">
              <div className="flex justify-between">
                <span className="font-semibold">Vendas</span>
                {!props.vendas ? (<Spinner size='sm'/>):(
                <span className="text-gray-500">{props.vendas}</span>  
                )}
                
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Valor Total de Vendas</span>
                {!props.totalVendido ?(<Spinner size='sm'/>):(
                <span className="text-gray-500">{props.totalVendido}</span>  
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
                {!props.marketplacesCadastradosUltimos30dias ?(<Spinner  size='sm'/>):
                (<span className="text-gray-500">{props.marketplacesCadastradosUltimos30dias}</span>)}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">
                  Estabelecimentos Filhos Registrados ultimos 30 dias 
                </span>
                {!props.estabelecimentosFilhosRegistradosUltimos30dias ?(<Spinner size='sm'/>):(
                <span className="text-gray-500">{props.estabelecimentosFilhosRegistradosUltimos30dias}</span>  
                )}
                
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Input
              className="flex-1 px-3 py-2 text-sm"
              placeholder="Digite o ID da Venda"
              variant="underlined"
            />
            
            <div className="ml-auto sm:ml-4">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                
                Reprocessar Venda
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Input
              className="flex-1 px-3 py-2 text-sm"
              placeholder="Digite o ID do Estabelecimento"
              variant="underlined"
            />
            <div className="ml-auto sm:ml-4">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                
                Reprocessar Saldo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function CheckIcon(props) {
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

function CodeIcon(props) {
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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function PizzaIcon(props) {
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

function ReplaceIcon(props) {
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
      <path d="M14 4c0-1.1.9-2 2-2" />
      <path d="M20 2c1.1 0 2 .9 2 2" />
      <path d="M22 8c0 1.1-.9 2-2 2" />
      <path d="M16 10c-1.1 0-2-.9-2-2" />
      <path d="m3 7 3 3 3-3" />
      <path d="M6 10V5c0-1.7 1.3-3 3-3h1" />
      <rect width="8" height="8" x="2" y="14" rx="2" />
    </svg>
  )
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

function SunMoonIcon(props) {
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
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  )
}

/*
  <CardContent className="grid grid-cols-1 gap-4 p-4">


            {props.servicesStatus.map(() => ( 
                <div key={props.id}>
                  <p>{props.serviceName}</p>
                  <CheckIcon className="text-green-500" />
                  <p>{props.last_update}</p>
                  <p>rtes</p>

                </div>
              ))}
            </CardContent> */
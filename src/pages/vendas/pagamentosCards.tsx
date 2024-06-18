import React from 'react'
import { formatarData } from '@/utils/dates'
type typeProps = {
  titulo: string
  currentComponent: string
  arrayTittles: Array<string>
  contentArray: Array<string>
  dados: Array<{ [key: string]: any }>
}

export default function PagamentosCards(props: typeProps) {
  return (
    <div className=" bg-gray-800 w-full lg:flex lg:flex-col items-center p-4 hidden">
      <h1 className="text-white text-start w-full p-2 ">{props.titulo}</h1>
      <div className="xl:flex flex-col hidden md:hidden w-full">
        <div
          className={`grid ${
            props.currentComponent === 'pagamentos'
              ? 'grid-cols-6'
              : 'grid-cols-5'
          } bg-gray-700 w-full `}
        >
          <p className="p-2 text-white">{props.arrayTittles[0]}</p>
          <p className="p-2 text-white">{props.arrayTittles[1]}</p>
          <p className="p-2 text-white">{props.arrayTittles[2]}</p>
          <p className="p-2 text-white">{props.arrayTittles[3]}</p>
          <p className="p-2 text-white">{props.arrayTittles[4]}</p>
          {props.currentComponent === 'pagamentos' ? (
            <p className="p-2 text-white">{props.arrayTittles[5]}</p>
          ) : null}
        </div>
        {props.dados && props.dados.length > 0 ? (
          <>
            {props.dados.map((data, index) => (
              <div
                key={index}
                className={`grid ${props.currentComponent === 'pagamentos' ? 'grid-cols-6' : 'grid-cols-5'} border-b`}
              >
                <p className="p-2 text-green-400">
                  {data[props.contentArray[0]]}
                </p>
                {props.currentComponent === 'splits' ? (
                  <p className="p-2 text-green-400">
                    {data.estabelecimento.nome_fantasia}
                  </p>
                ) : (
                  <p className="p-2 text-green-400">
                    {data[props.contentArray[1]]}
                  </p>
                )}

                <p className="p-2 text-green-400">
                  {data[props.contentArray[2]]}
                </p>
                <p className="p-2 text-green-400">
                  {data[props.contentArray[3]]}
                </p>
                <p className="p-2 text-green-400">
                  {data[props.contentArray[4]]}
                </p>
                {props.currentComponent === 'pagamentos' ? (
                  <p className="p-2 text-green-400">
                    {formatarData(data[props.contentArray[5]])}
                  </p>
                ) : null}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}

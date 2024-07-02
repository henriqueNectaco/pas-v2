import React from 'react'
import { formatarData } from '@/utils/dates'
import { Button } from '@nextui-org/button'
type typeProps = {
  titulo: string
  currentComponent: string
  arrayTittles: Array<string>
  contentArray: Array<string>
  dados: Array<{ [key: string]: any }>
  isLoadingReprocessSale: boolean
  reprocessSale: () => void
}

export default function PagamentosCards(props: typeProps) {
  const Pstyles =
    'flex flex-row items-center md:justify-start justify-center   p-2 text-green-400 gap-2'
  return (
    <div className="bg-gray-800 w-full lg:flex lg:flex-col items-center ">
      <div className=" bg-gray-800 w-full xl:flex xl:flex-col items-center p-4 hidden  md:hidden lg:hidden">
        <h1 className="text-white text-start w-full p-2 ">{props.titulo}</h1>
        <div className="xl:flex flex-col hidden md:hidden w-full">
          <div
            className={`grid ${props.currentComponent === 'pagamentos'
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
              {props.currentComponent === 'pagamentos' ? (
                <div className="mt-1 w-full lg:grid xl:grid lg:grid-cols-3">
                  <Button
                    fullWidth={true}
                    color="danger"
                    variant="ghost"
                    className="flex lg:items-center lg:justify-start"
                    isLoading={props.isLoadingReprocessSale}
                    onClick={props.reprocessSale}
                  >
                    Reprocessar Venda
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <div className="xl:hidden  w-full flex flex-col  bg-gray-800 p-2 ">
        <h1 className="text-white">{props.titulo}</h1>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-2">
          {props.dados.map((data) => (
            <div className="bg-gray-700 rounded-md" key={data.id}>
              <div className={Pstyles}>
                <p>{props.arrayTittles[0]}</p>
                <p> {data[props.contentArray[0]]}</p>
              </div>
              <div className={Pstyles}>
                <p>{props.arrayTittles[1]}</p>
                <p> {data[props.contentArray[1]]}</p>
              </div>
              <div className={Pstyles}>
                <p>{props.arrayTittles[2]}</p>
                <p> {data[props.contentArray[2]]}</p>
              </div>
              <div className={Pstyles}>
                <p>{props.arrayTittles[3]}</p>
                <p> {data[props.contentArray[3]]}</p>
              </div>
              <div className={Pstyles}>
                <p>{props.arrayTittles[4]}</p>
                <p> {data[props.contentArray[4]]}</p>
              </div>
              {props.currentComponent === 'pagamentos' ? (
                <div className={Pstyles}>
                  <p>{props.arrayTittles[5]}</p>
                  <p> {formatarData(data[props.contentArray[5]])}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {props.currentComponent === 'pagamentos' ? (
          <div className="mt-1 w-full lg:grid xl:grid lg:grid-cols-3">
            <Button
              fullWidth={true}
              color="danger"
              variant="ghost"
              className="flex lg:items-center lg:justify-start"
              isLoading={props.isLoadingReprocessSale}
              onClick={props.reprocessSale}
            >
              Reprocessar Venda
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

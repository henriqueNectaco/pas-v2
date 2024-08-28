import { statusPayment } from '@/lib'
import { formatarData } from '@/lib/sum'

import { Button } from '@nextui-org/button'

type typeData = {
  id?: string
  status_pagamento_id: number
  estabelecimento: {
    nome_fantasia: string
  }
  tipo_split?: string
  valor?: number
  categoria?: string
  taxa?: number
}

type ContentArrayKeys =
  | 'id'
  | 'status_pagamento_id'
  | 'valor'
  | 'taxa'
  | 'valor_recebido'
  | 'data_recebimento'
  | 'tipo_split'
  | 'nome_fantasia'
  | 'categoria'
type TypeProps = {
  titulo: string
  currentComponent: string
  arrayTittles: Array<string>
  contentArray: Array<ContentArrayKeys>
  dados: Array<typeData> | undefined
  isLoadingReprocessSale: boolean
  reprocessSale: () => void
}

export default function PagamentosCards(props: TypeProps) {
  const Pstyles =
    'flex flex-row items-center md:justify-start justify-center p-2 text-green-400 gap-2'

  return (
    <div className="bg-gray-800 w-full lg:flex lg:flex-col items-center">
      <div className="bg-gray-800 w-full xl:flex xl:flex-col items-center p-4 hidden md:hidden lg:hidden">
        <h1 className="text-white text-start w-full p-2">{props.titulo}</h1>
        <div className="xl:flex flex-col hidden md:hidden w-full">
          <div
            className={`grid ${
              props.currentComponent === 'pagamentos'
                ? 'grid-cols-7'
                : 'grid-cols-5'
            } bg-gray-700 w-full`}
          >
            {props.arrayTittles.length !== 0 && (
              <>
                {props.arrayTittles.map((title, index) => (
                  <p key={index} className="p-2 text-white">
                    {title}
                  </p>
                ))}
              </>
            )}
          </div>
          {props.dados && props.dados.length > 0 ? (
            <>
              {props.dados.map((data, index) => (
                <div
                  key={index}
                  className={`grid ${
                    props.currentComponent === 'pagamentos'
                      ? 'grid-cols-7'
                      : 'grid-cols-5'
                  } border-b`}
                >
                  <p className="p-2 text-green-400">{data.id}</p>
                  {props.currentComponent === 'splits' ? (
                    <p className="p-2 text-green-400">
                      {data.estabelecimento.nome_fantasia}
                    </p>
                  ) : (
                    <p className="p-2 text-green-400">
                      {statusPayment(data.status_pagamento_id)}
                    </p>
                  )}

                  <p className="p-2 text-green-400">
                    {String(data[props.contentArray[2] as keyof typeData])}
                  </p>

                  <p className="p-2 text-green-400">
                    {String(data[props.contentArray[3] as keyof typeData])}
                  </p>
                  <p className="p-2 text-green-400">
                    {String(data[props.contentArray[4] as keyof typeData])}
                  </p>
                  {props.currentComponent === 'pagamentos' && (
                    <p className="p-2 text-green-400">
                      {formatarData(
                        String(data[props.contentArray[5] as keyof typeData]),
                      )}
                    </p>
                  )}
                </div>
              ))}
              {props.currentComponent === 'pagamentos' && (
                <div className="pt-4 w-full lg:grid xl:grid lg:grid-cols-5">
                  <Button
                    fullWidth
                    color="danger"
                    variant="shadow"
                    isLoading={props.isLoadingReprocessSale}
                    onClick={props.reprocessSale}
                  >
                    Reprocessar Venda
                  </Button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      <div className="xl:hidden w-full flex flex-col bg-gray-800 p-2">
        <h1 className="text-white">{props.titulo}</h1>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-2">
          {props.dados !== undefined && (
            <>
              {props.dados.map((data) => (
                <div className="bg-gray-700 rounded-md shadow-md" key={data.id}>
                  <div className={Pstyles}>
                    <p>{props.arrayTittles[0]}</p>
                    <p>
                      {String(data[props.contentArray[0] as keyof typeData])}
                    </p>
                  </div>
                  <div className={Pstyles}>
                    <p>{props.arrayTittles[1]}</p>
                    {props.currentComponent === 'pagamentos' ? (
                      <p>
                        {statusPayment(
                          String(data[props.contentArray[1] as keyof typeData]),
                        )}
                      </p>
                    ) : (
                      <p>{data.estabelecimento.nome_fantasia}</p>
                    )}
                  </div>
                  <div className={Pstyles}>
                    <p>{props.arrayTittles[2]}</p>
                    <p>
                      {String(data[props.contentArray[2] as keyof typeData])}
                    </p>
                  </div>
                  <div className={Pstyles}>
                    <p>{props.arrayTittles[3]}</p>
                    <p>
                      {String(data[props.contentArray[3] as keyof typeData])}
                    </p>
                  </div>
                  <div className={Pstyles}>
                    <p>{props.arrayTittles[4]}</p>
                    <p>
                      {String(data[props.contentArray[4] as keyof typeData])}
                    </p>
                  </div>
                  {props.currentComponent === 'pagamentos' ? (
                    <div className={Pstyles}>
                      <p>{props.arrayTittles[5]}</p>
                      <p>
                        {formatarData(
                          String(data[props.contentArray[5] as keyof typeData]),
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          )}
        </div>
        {props.currentComponent === 'pagamentos' ? (
          <div className="mt-1 w-full lg:grid xl:grid lg:grid-cols-3">
            <Button
              fullWidth
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

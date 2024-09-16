import { statusPayment } from '@/lib'
import { formatarData } from '@/lib/sum'

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
}

export default function PagamentosCards(props: TypeProps) {
  // Fallback para garantir que os arrays não sejam undefined
  const arrayTittles = props.arrayTittles || []
  const contentArray = props.contentArray || []
  const dados = props.dados || []

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
            {arrayTittles.length > 0 && (
              <>
                {arrayTittles.map((title, index) => (
                  <p key={index} className="p-2 text-white">
                    {title}
                  </p>
                ))}
              </>
            )}
          </div>
          {dados.length > 0 ? (
            <>
              {dados.map((data, index) => (
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
                    {String(data[contentArray[2] as keyof typeData])}
                  </p>

                  <p className="p-2 text-green-400">
                    {String(data[contentArray[3] as keyof typeData])}
                  </p>
                  <p className="p-2 text-green-400">
                    {String(data[contentArray[4] as keyof typeData])}
                  </p>
                  {props.currentComponent === 'pagamentos' && (
                    <p className="p-2 text-green-400">
                      {formatarData(
                        String(data[contentArray[5] as keyof typeData]),
                      )}
                    </p>
                  )}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
      <div className="xl:hidden w-full flex flex-col bg-gray-800 p-2">
        <h1 className="text-white">{props.titulo}</h1>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-2">
          {dados.length > 0 && (
            <>
              {dados.map((data) => (
                <div className="bg-gray-700 rounded-md shadow-md" key={data.id}>
                  <div className={Pstyles}>
                    <p>{arrayTittles[0]}</p>
                    <p>{String(data[contentArray[0] as keyof typeData])}</p>
                  </div>
                  <div className={Pstyles}>
                    <p>{arrayTittles[1]}</p>
                    {props.currentComponent === 'pagamentos' ? (
                      <p>
                        {statusPayment(
                          String(data[contentArray[1] as keyof typeData]),
                        )}
                      </p>
                    ) : (
                      <p>{data.estabelecimento.nome_fantasia}</p>
                    )}
                  </div>
                  <div className={Pstyles}>
                    <p>{arrayTittles[2]}</p>
                    <p>{String(data[contentArray[2] as keyof typeData])}</p>
                  </div>
                  <div className={Pstyles}>
                    <p>{arrayTittles[3]}</p>
                    <p>{String(data[contentArray[3] as keyof typeData])}</p>
                  </div>
                  <div className={Pstyles}>
                    <p>{arrayTittles[4]}</p>
                    <p>{String(data[contentArray[4] as keyof typeData])}</p>
                  </div>
                  {props.currentComponent === 'pagamentos' ? (
                    <div className={Pstyles}>
                      <p>{arrayTittles[5]}</p>
                      <p>
                        {formatarData(
                          String(data[contentArray[5] as keyof typeData]),
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

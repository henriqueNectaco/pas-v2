import { formatarData } from '@/utils/dates';
import { Spinner } from '@nextui-org/react';
import { statusMarketplacesChilds, nullVerifiyer } from '@/lib/index';
import DropDownMenuFilhos from '../marketplaces/dropdown/filhos';
import React from 'react'
import { objectMarketplace } from '@/lib/types/marketplaces';
type Dados = { [key: string]: string | number | boolean | any };

type marketplaceProps = {
  array: Array<string>;
  contentArray: string[];
  data: Dados[];
  ColsBody: number;
  currentPage: string;
  id?: string;
  MarketplacesArray?: Array<objectMarketplace> | undefined

};

export default function Table(props: marketplaceProps) {
  const stylesRows = 'p-4 pl-6 border-b flex items-center justify-start '
  return (
    <div className="max-w-screen w-full h-full">
      <div className="overflow-auto rounded-2xl bg-white shadow-3xl hidden md:hidden lg:hidden xl:block border max-w-screen">
        <div className={`border-b-3 border-b-black w-full lg:grid lg:grid-cols-${props.array.length} `}>
          {props.array.map((i: string) => (
            <div key={i} className="w-full p-6 pt-4 pb-4 rounded-md flex justify-start items-center">
              <p className="tracking-wide text-md font-semibold">{i}</p>
            </div>
          ))}
        </div>
        {props.data.length === 0 ? (
          <Spinner />
        ) : (
          <div className={`flex flex-col lg:grid ${props.currentPage === 'filhos' ? 'lg:grid-cols-6' : `lg:grid-cols-${props.ColsBody}`} max-w-screen `}>
            {props.data.map((dados: Dados, index: number) => (
              <React.Fragment key={index} >
                <div className={stylesRows}>
                  <p className='text-sm'>{dados[props.contentArray[0]]}</p>
                </div>
                <div className={stylesRows}>
                  <p className='text-sm'>{nullVerifiyer(dados[props.contentArray[1]])}</p>
                </div>
                <div className={stylesRows}>
                  {props.currentPage === 'filhos' ? (
                    <p className={` text-sm ${statusMarketplacesChilds(dados[props.contentArray[2]]) === 'Aprovado' ? 'text-green-500' : 'text-yellow-400'}`}>
                      {statusMarketplacesChilds(dados[props.contentArray[2]])}
                    </p>
                  ) : (
                    <p>{dados[props.contentArray[2]]}</p>
                  )}
                </div>
                <div className={stylesRows}>
                  <p className='text-sm'>{formatarData(dados[props.contentArray[3]])}</p>
                </div>
                {props.currentPage === 'filhos' && (
                  <div className="text-blue-600 pl-6 p-4 border-b flex items-center justify-start">
                    <p className='text-sm'>{dados.usuarios_estabelecimentos[0]?.usuario.email}</p>
                  </div>
                )}
                {props.ColsBody > 5 && props.currentPage === 'filhos' && (
                  <div className="p-4 border-b  flex items-center justify-end ">
                    <DropDownMenuFilhos id={dados.id} nomefantasia={dados[props.contentArray[1]]} fullWidth={false} items={['Adicionar SSL']} MarketplacesArray={props.MarketplacesArray} />
                  </div>
                )}
                {props.currentPage === 'estabelecimentosFilhos' && (
                  <div className="p-4 border-b flex items-start justify-end border-gray-300">
                    <DropDownMenuFilhos fullWidth={false} items={['Trocar de parent', 'Reprocessar pedidos']} id={dados.id} MarketplacesArray={props.MarketplacesArray} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="xl:hidden max-w-screen w-full h-full space-y-3">
        {props.data.length === 0 ? (
          <Spinner />
        ) : (
          <>
            {props.data.map((dados, index) => (
              <div key={index} className="border-b border-sky-400 shadow-md w-full flex flex-col items-center justify-center gap-2 rounded-md bg-white p-4">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">{props.array[0]}</p>
                  <p>{dados[props.contentArray[0]]}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">{props.array[1]}</p>
                  <p>{dados[props.contentArray[1]]}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">{props.array[2]}</p>
                  {props.currentPage === 'filhos' ? (
                    <p className={`${statusMarketplacesChilds(dados[props.contentArray[2]]) === 'Aprovado' ? 'text-green-500' : 'text-yellow-400'}`}>
                      {statusMarketplacesChilds(dados[props.contentArray[2]])}
                    </p>
                  ) : (
                    <p>{dados[props.contentArray[2]]}</p>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold">{props.array[3]}</p>
                  <p>{formatarData(dados[props.contentArray[3]])}</p>
                </div>
                {props.array.length >= 5 && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold">{props.array[4]}</p>
                    {props.currentPage === 'filhos' ? (
                      dados.usuarios_estabelecimentos.map((usuarioEstabelecimento: any, idx: number) => (
                        <p className="text-blue-500" key={idx}>
                          {usuarioEstabelecimento.usuario.email}
                        </p>
                      ))
                    ) : (
                      <p>{dados[props.contentArray[4]]}</p>
                    )}
                  </div>
                )}
                {props.array.length > 5 && props.currentPage === 'filhos' && (
                  <div className="flex flex-col items-center justify-center">
                    <DropDownMenuFilhos items={['Adicionar SSL']} MarketplacesArray={props.MarketplacesArray} />
                  </div>
                )}
                {props.currentPage === 'estabelecimentosFilhos' && (
                  <div className="flex flex-col items-center justify-center">
                    <DropDownMenuFilhos items={['Trocar de parent', 'Reprocessar pedidos']} id={dados.id} MarketplacesArray={props.MarketplacesArray} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

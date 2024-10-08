import { Spinner } from '@nextui-org/react'

import DropdownButton from '../../../pages/marketplaces/dropdown'
export type marketplaceItemsTypes = {
  id: number
  mainECId: number
  mainECEmail: string
  mainECNomeFantasia: string
}
type marketplaceProps = {
  marketplace: Array<marketplaceItemsTypes> | null
}
export default function TableMarketPlaces(props: marketplaceProps) {
  return (
    <div className="max-w-screen  w-full    ">
      <div className=" p-2 overflow-auto rounded-2xl bg-white shadow hidden md:hidden lg:hidden xl:block border  max-w-screen">
        <table className="w-full max-w-screen  ">
          <thead className="w-full  border-b-2  border-black ">
            <tr className=" w-full   ">
              <th className=" w-1/6 p-3 text-sm font-semibold tracking-wide text-left">
                Id
              </th>
              <th className=" w-1/6     p-3 text-sm font-semibold tracking-wide text-left">
                Id EC
              </th>
              <th className=" w-2/6 p-3 text-sm font-semibold tracking-wide text-left">
                MarketPlace
              </th>
              <th className=" w-2/6 p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!props.marketplace ? (
              <Spinner />
            ) : (
              <>
                {props.marketplace.map((mkt: marketplaceItemsTypes) => (
                  <tr key={mkt.id} className="bg-white ">
                    <td className="  text-sm text-gray-700 whitespace-nowrap p-3">
                      {mkt.id}
                    </td>
                    <td className=" text-sm text-gray-700 whitespace-nowrap p-3">
                      {mkt.mainECId}
                    </td>

                    <td className=" text-sm text-gray-700 whitespace-nowrap p-3">
                      {mkt.mainECNomeFantasia}
                    </td>
                    <td className=" text-sm text-blue-600 whitespace-nowrap p-3">
                      {mkt.mainECEmail}
                    </td>
                    <td className=" text-sm text-gray-700 whitespace-nowrap p-3">
                      <DropdownButton
                        nomeFantasia={mkt.mainECNomeFantasia}
                        id={mkt.id}
                      />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <>
        {!props.marketplace ? (
          <Spinner size="lg" />
        ) : (
          <div className="space-y-2">
            {props.marketplace.map((mkt: marketplaceItemsTypes) => (
              <div
                key={mkt.id}
                className=" xl:hidden w-full border-b border-sky-400 shadow-md  rounded-md  flex flex-col   items-center justify-center lg:flex-row p-4 gap-2 bg-white"
              >
                <div className="w-1/4  flex flex-col items-center justify-center">
                  <p>Id:</p>
                  <p>{mkt.id}</p>
                </div>
                <div className="w-1/4  flex flex-col items-center justify-center">
                  <p>ID EC:</p>
                  <p>{mkt.mainECId}</p>
                </div>
                <div className="w-1/4  flex flex-col items-center justify-center">
                  <p>Marketplace</p>
                  <p>{mkt.mainECNomeFantasia}</p>
                </div>

                <div className="w-1/4  flex flex-col items-center justify-center">
                  <p>Email:</p>
                  <p>{mkt.mainECEmail}</p>
                </div>
                <div className="w-1/4  flex flex-col items-center justify-center">
                  <DropdownButton
                    id={mkt.id}
                    nomeFantasia={mkt.mainECNomeFantasia}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  )
}
/*

<tr className="bg-gray-50">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                  10002
                </a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Kring New Fit office chair, mesh + PU, black
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                  Shipped
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                16/10/2021
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                $200.00
              </td>
            </tr>



                     {!props.marketplace ? (
              <Spinner size="lg" />
            ) : ({props.marketplace.map((mkt:any)=>{

<p>teste</p>
              
            })}

       <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <p href="#" className="font-bold text-blue-500 hover:underline">
                  {mkt.id}
                </p>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {mkt.IdEc}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex flex-col items-start ">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"></span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {mkt.data}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                teste
              </td>
            </tr>








*/

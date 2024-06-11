import { formatarData } from '@/utils/dates'
import { Spinner } from '@nextui-org/react'
// import DropdownButton from '../../pages/marketplaces/dropdown'
type mktProps = {}

type marketplaceProps = {
  array: Array
  contentArray: Array
}
export default function TableCrons(props: marketplaceProps) {
  const arrayLengh = props.array.length

  return (
    <div className="max-w-screen  w-full   h-screen ">
      <div className=" p-4 overflow-auto rounded-2xl bg-white shadow hidden md:hidden lg:hidden xl:block border  max-w-screen">
        <div
          className={`border-b-3 border-black w-full flex flex-col lg:grid lg:grid-cols-${props.array.length}`}
        >
          {props.array.map((i: string) => (
            <div key={i} className="w-full p-2 flex justify-center">
              {i}
            </div>
          ))}
        </div>
        {!props.data ? (
          <Spinner />
        ) : (
          <div
            className={`flex flex-col lg:grid lg:grid-cols-${props.ColsBody}`}
          >
            {props.data.map((dados) => (
              <>
                <p>{dados[props.contentArray[0]]}</p>
                <p>{dados[props.contentArray[1]]}</p>
                <p>{dados[props.contentArray[2]]}</p>
                <p>{dados[props.contentArray[3]]}</p>
              </>
            ))}
          </div>
        )}
      </div>

      <div className="xl:hidden max-w-screen w-full h-full space-y-3  ">
        {props.data.map((dados) => (
          <>
            <div className="border-b border-sky-400 shadow-md  w-full flex flex-col items-center justify-center gap-2 rounded-md bg-white p-4">
              <div className="flex flex-col items-center justify-center">
                <p>{props.array[0]}</p>
                <p>{dados[props.contentArray[0]]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>{props.array[1]}</p>
                <p>{dados[props.contentArray[1]]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>{props.array[2]}</p>
                <p>{dados[props.contentArray[2]]}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>{props.array[3]}</p>
                <p>{formatarData(dados[props.contentArray[3]])}</p>
              </div>

              {arrayLengh >= 5 ? (
                <div className="flex flex-col items-center justify-center">
                  <p>{props.array[4]}</p>
                  <p>{dados[props.contentArray[4]]}</p>
                </div>
              ) : null}
            </div>
          </>
        ))}
      </div>
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





      <>
   <table className="w-full max-w-screen  ">
          <thead className="w-full  border-b-2  border-black ">
            <tr className=" w-full   ">
              {props.array.map((i: string) => (
                <th
                  key={i}
                  className=" w-1/6 p-3 text-sm font-semibold tracking-wide text-left"
                >
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!props.marketplace ? (
              <Spinner />
            ) : (
              <>
                {props.marketplace.map(() => (
                  <tr key={props.id} className="bg-white ">
                    <td className="  text-sm text-gray-700 whitespace-nowrap p-3">
                      {props.rowOne}
                    </td>
                    <td className=" text-sm text-gray-700 whitespace-nowrap p-3">
                      {props.rowTwo}
                    </td>

                    <td className=" text-sm text-gray-700 whitespace-nowrap p-3">
                      {props.rowThree}
                    </td>
                    <td className=" text-sm text-blue-600 whitespace-nowrap p-3">
                      {props.rowFour}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

*/

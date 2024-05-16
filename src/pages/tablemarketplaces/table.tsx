import {
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import React from 'react'
import { DotsThreeOutlineVertical } from 'phosphor-react'
import { useRouter } from 'next/router'

type mktProps = {
  id: number
  mainECId: number
  mainECEmail: string
  mainECNomeFantasia: string
}
type marketplaceProps = {
  marketplace: Array | null
}
export default function TableTestes(props: marketplaceProps) {
  const router = useRouter()
  return (
    <div className="max-w-screen  w-full   h-screen bg-gray-100">
      <div className="  overflow-auto rounded-lg shadow hidden md:hidden lg:hidden xl:block border  max-w-screen">
        <table className="w-full max-w-screen ">
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
                {props.marketplace.map((mkt: mktProps) => (
                  <tr key={mkt.id} className="bg-white ">
                    <td className=" text-sm text-gray-700 whitespace-nowrap p-4">
                      {mkt.id}
                    </td>
                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                      {mkt.mainECId}
                    </td>

                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                      {mkt.mainECNomeFantasia}
                    </td>
                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                      {mkt.mainECEmail}
                    </td>
                    <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light">
                            <DotsThreeOutlineVertical size={20} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Action event example"
                          onAction={(key) => {
                            if (key == 'showmarketplaceschilds') {
                              router.push(`/marketplaces/${mkt.id}/filhos`)
                            }
                          }}
                          color="primary"
                          variant="solid"
                        >
                          <DropdownItem key={mkt.id}>
                            Cadastrar Marketplace filho
                          </DropdownItem>
                          <DropdownItem key="showmarketplaceschilds">
                            Visualizar Marketplaces filhos
                          </DropdownItem>
                          <DropdownItem key="showestabelecimentschilds">
                            Visualizar Estabelecimentos filhos
                          </DropdownItem>
                          <DropdownItem key="addssl">
                            Adicionar SSL
                          </DropdownItem>
                          <DropdownItem key="reprocessSales">
                            Reprocessar Vendas
                          </DropdownItem>
                          <DropdownItem key="importEc">
                            Importar EC&apos;s
                          </DropdownItem>
                          <DropdownItem key="taxfortransaction">
                            Cobrança por transação
                          </DropdownItem>
                          <DropdownItem key="importSales">
                            Importar Vendas
                          </DropdownItem>
                          <DropdownItem key="renewcache">
                            Renovar Cache
                          </DropdownItem>
                          <DropdownItem key="turnOff">Desativar</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
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
            {props.marketplace.map((mkt: mktProps) => (
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
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light">
                        <DotsThreeOutlineVertical size={20} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Action event example"
                      onAction={(key) => {
                        alert(key)
                      }}
                      color="primary"
                      variant="solid"
                    >
                      <DropdownItem key={mkt.id}>
                        Cadastrar Marketplace filho
                      </DropdownItem>
                      <DropdownItem key="showmarketplaceschilds">
                        Visualizar Marketplaces filhos
                      </DropdownItem>
                      <DropdownItem key="showestabelecimentschilds">
                        Visualizar Estabelecimentos filhos
                      </DropdownItem>
                      <DropdownItem key="addssl">Adicionar SSL</DropdownItem>
                      <DropdownItem key="reprocessSales">
                        Reprocessar Vendas
                      </DropdownItem>
                      <DropdownItem key="importEc">
                        Importar EC&apos;s
                      </DropdownItem>
                      <DropdownItem key="taxfortransaction">
                        Cobrança por transação
                      </DropdownItem>
                      <DropdownItem key="importSales">
                        Importar Vendas
                      </DropdownItem>
                      <DropdownItem key="renewcache">
                        Renovar Cache
                      </DropdownItem>
                      <DropdownItem key="turnOff">Desativar</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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

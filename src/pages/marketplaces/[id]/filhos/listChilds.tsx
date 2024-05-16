import { Spinner } from '@nextui-org/react'

type PropsTypes = { marketplace: Array }
type mktProps = {
  id: number
  status_estabelecimento: { titulo: string }
  nome_fantasia: string
  created: date
  usuarios_estabelecimentos: { usuario: { email: string } }
}
export default function ListChilds(props: PropsTypes) {
  return (
    <div className="overflow-auto rounded-lg shadow hidden md:hidden lg:hidden xl:block border  max-w-screen">
      <table className="w-full max-w-screen  border border-blue-500 ">
        <thead className="w-screen  border-b-2  border-black ">
          <tr className=" w-screen   ">
            <th className="  p-3 text-sm font-semibold tracking-wide text-left">
              Id
            </th>
            <th className="      p-3 text-sm font-semibold tracking-wide text-left">
              Nome
            </th>
            <th className="  p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="  p-3 text-sm font-semibold tracking-wide text-left">
              Data de criação
            </th>
            <th className="  p-3 text-sm font-semibold tracking-wide text-left">
              Email
            </th>
            <th className="  p-3 text-sm font-semibold tracking-wide text-left">
              dropdown
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
                    {mkt.nome_fantasia}
                  </td>

                  <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                    {mkt.status_estabelecimento.titulo}
                  </td>
                  <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                    {mkt.created}
                  </td>
                  <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                    {/* Loop para acessar o email de cada usuário */}
                    {mkt.usuarios_estabelecimentos.map((usuario: any) => (
                      <span key={usuario.id}>{usuario.usuario.email}</span>
                    ))}
                  </td>
                  <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                    teste
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}

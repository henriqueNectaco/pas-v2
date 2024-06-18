import { splitsProps, splits } from '../../types/vendas/splitscards'
export default function SplitsCards(props: splitsProps) {
  return (
    <div className="border-2 bg-gray-800 w-full flex flex-col items-center p-4">
      <h1 className="text-white text-start w-full p-2 ">Splits</h1>
      <div className=" xl:hidden w-full">
        {props.splits.map((split: splits) => (
          <>
            <div className=" w-full">
              <div className="w-full p-2 pl-0 flex flex-row items-center justify-start gap-2">
                <p className="text-green-500">Id</p>
                <p className="text-green-500">{split.id}</p>
              </div>
              <div className="w-full p-2 pl-0 flex flex-row items-center justify-start gap-2">
                <p className="text-green-500">Estabelecimento</p>
                <p className="text-green-500">
                  {split.estabelecimento.nome_fantasia}
                </p>
              </div>
              <div className="w-full p-2 pl-0 flex flex-row items-center justify-start gap-2">
                <p className="text-green-500">Tipo</p>
                <p className="text-green-500">{split.tipo_split}</p>
              </div>
              <div className="w-full p-2 pl-0 flex flex-row items-center justify-start gap-2">
                <p className="text-green-500">Categoria</p>
                <p className="text-green-500">{split.id}</p>
              </div>
              <div className="w-full p-2 pl-0 flex flex-row items-center justify-start gap-2">
                <p className="text-green-500">Valor</p>
                <p className="text-green-500">R$ {split.valor}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="xl:flex flex-col hidden md:hidden  w-full">
        <div className="grid grid-cols-5 bg-gray-700 w-full ">
          <p className="p-2 text-white">Id</p>
          <p className="p-2 text-white">Estabelecimento</p>
          <p className="p-2 text-white">Tipo</p>
          <p className="p-2 text-white">Categoria</p>
          <p className="p-2 text-white">Valor</p>
        </div>
        {props.splits.map((split: splits) => (
          <>
            <div className="grid grid-cols-5 border-b">
              <p className="p-2 text-green-400">{split.id}</p>
              <p className="p-2 text-green-400">
                {split.estabelecimento.nome_fantasia}
              </p>
              <p className="p-2 text-green-400">amount?</p>
              <p className="p-2 text-green-400">{split.tipo_split}</p>
              <p className="p-2 text-green-400">{split.valor}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

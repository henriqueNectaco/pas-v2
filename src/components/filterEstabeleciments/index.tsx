import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { propsFilterEstabeleciment } from '@/types/marketplaces'
export default function FilterEstabeleciments(
  props: propsFilterEstabeleciment,
) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 w-full  bg-white">
      <div className=" col-span-2 flex flex-col lg:flex-row gap-2 p-3 lg:items-end lg:justify-end items-center justify-center">
        <Input onChange={props.onChangeId} variant="underlined" label="ID" />
        <Input
          variant="underlined"
          onChange={props.onChangeNomeFantasia}
          label="Nome Fantasia"
        />
        <Input
          variant="underlined"
          onChange={props.onChangeNomeFatura}
          label="Nome na Fatura"
        />
      </div>
      <div className=" col-span-2 flex flex-col lg:flex-row  lg:items-end lg:justify-end p-3 gap-2">
        <div className="col-span-1 lg:w-1/2  flex flex-row gap-2 lg:gap-1 ">
          <Button onClick={props.limparFiltro} color="danger" fullWidth={true}>
            Limpar Filtro
          </Button>
          <Button onClick={props.filtrar} color="primary" fullWidth={true}>
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  )
}

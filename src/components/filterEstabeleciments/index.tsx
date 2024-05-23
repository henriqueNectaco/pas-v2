import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { propsFilterEstabeleciment } from '@/types/marketplaces'
export default function FilterEstabeleciments(
  props: propsFilterEstabeleciment,
) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 w-full border bg-white">
      <div className="border-2 col-span-1 ">
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
      <div className="border-2 col-span-1">
        <Button onClick={props.limparFiltro} color="danger">
          Limpar Filtro
        </Button>
        <Button onClick={props.filtrar} color="primary">
          Filtrar
        </Button>
      </div>
    </div>
  )
}

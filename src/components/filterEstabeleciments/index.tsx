import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { propsFilterEstabeleciment } from '@/types/marketplaces'
export default function FilterEstabeleciments(
  props: propsFilterEstabeleciment,
) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 w-full rounded-2xl mb-2 bg-white">
      <div className=" col-span-2 flex flex-col lg:flex-row gap-2 p-3 lg:items-end lg:justify-end items-center justify-center">
        <Input onChange={props.onChange} name='id_estabelecimento' variant="underlined" label="ID" type='number' value={props.data.id_estabelecimento} />
        <Input
          name='nome_fantasia'
          variant="underlined"
          onChange={props.onChange}
          label="Nome Fantasia"
          value={props.data.nome_fantasia}
        />
        <Input
          variant="underlined"
          onChange={props.onChange}
          value={props.data.identificacao_fatura}
          name='identificacao_fatura'
          label="Nome na Fatura"
        />
      </div>
      <div className=" col-span-2 flex flex-col lg:flex-row  lg:items-end lg:justify-end p-3 gap-2">
        <div className="col-span-1 lg:w-1/2  flex flex-row gap-2 lg:gnome_fantasia={data.nome_fantasia}ap-1 ">
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

import { Button } from '@nextui-org/button'
import React, { ChangeEvent } from 'react'
import { Input } from '@nextui-org/input'
import { FormVendasTypes } from '@/types/vendas'
export default function FormVendas(props: FormVendasTypes) {
  return (
    <>
      <form className=" h-full  w-full lg:w-2/6  p-6 flex flex-col items-center justify-around  lg:px-8 sm:rounded-xl  my-4  lg:shadow-md border-2 bg-white" onSubmit={props.onSubmit}>
        <div className='w-full gap-2 flex flex-col items-center justify-center'>
          <label className=" font-bold  w-5/6 lg:w-4/6 text-start">Vendas:</label>
          <Input
            type="text"
            placeholder="ID da venda ou zoop transaction ID"
            variant="underlined"
            className="w-5/6 lg:w-4/6"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              props.setInputIdDaVenda(e.target.value)
            }}
            value={props.vendaId}
          />

        </div>

        <div className="flex   items-center justify-center  gap-2   w-5/6 lg:w-3/6   mt-4 lg:mt-6">
          <Button
            onClick={props.handleSearch}
            color="primary"
            variant="shadow"
            isLoading={props.Isloading}
          >
            Consultar
          </Button>
          {props.vendaId && (
            <Button onClick={props.handleCleanInput} color="danger">
              Limpar
            </Button>
          )}
        </div>
      </form>
    </>
  )
}

import Header from '@/components/Header'
import Steperr from '@/components/steper'
import { useState } from 'react'
import { Button } from '@nextui-org/button'
export default function CadastrarMarketplaces() {
  const stepsData = [
    { label: 'Step 1', active: true },
    { label: 'Step 2', active: true },
    { label: 'Step 3', active: true },
    { label: 'Step 4', active: true },
    { label: 'teste', active: true },
  ]
  return (
    <div className="max-w-screen ">
      <Header />

      <div className="bg-gray-200 h-screen p-4 max-w-screen ">
        <h1 className="font-bold">Cadastrar Marketplace(Zoop)</h1>
        <div className="bg-white h-full w-full p-4">
          <Steperr activeStep={3} stepsData={stepsData} />
        </div>
      </div>
    </div>
  )
}

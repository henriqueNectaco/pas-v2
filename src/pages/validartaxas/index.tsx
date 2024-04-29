;
import Header from '../../components/Header/index'
import { Input, Button, } from "@nextui-org/react";
import App from '@/components/Header/test';



export default function ValidarTaxas() {

  return (
    <div className='h-screen w-screen flex flex-col items-center  '>
      <App />
      <div className=' w-4/6 lg:w-2/6 flex flex-col items-center justify-center h-1/6 border-2 mt-8 lg:p-4'>
        <h1>Consultar Taxa</h1>
        <div className='flex flex-row items-center justify-center  w-full p-2'>
          <Input color='default' variant='underlined' className='w-2/4' size='sm' />
          <Button onClick={() => { alert('vai se fuder') }} size='md' color='primary' variant='solid'>Consultar</Button></div>
      </div>


    </div>
  )
}
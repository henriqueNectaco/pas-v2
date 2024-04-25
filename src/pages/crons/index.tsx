import Header from '../../components/Header/index'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { CardCron } from './items';

type CronProps = {
  Cron: string,
  Scheduled: string,
  Mensagem: string,
  date: string;
}
export default function Crons() {

  const [logs, setLogs] = useState([]);
  const [crons, setCrons] = useState<any>(null);
  const [mensagem, setMensagem] = useState<any>('');
  const token = Cookies.get('token')
  const getCrons = async () => {
    const res = await axios.get(`https://api.zsystems.com.br/z1/crons/logs
        `, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.data.success === true) {
      toast.success(res.data.sucess)
      setCrons(res.data.cronsLogs)
      setMensagem(res.data.cronsLogs.mensage)
      console.log()


    } else {
      toast.error(res.data.error)
    }
  };

  useEffect(() => {
    getCrons();
    console.log(crons)
    console.log(mensagem)
  }, []);

  return (
    <div className='h-scren w-screen'>
      <Header />
      <>
        {!crons ? (
          <p>carreganu</p>
        ) : (
          <>
            {crons.map((crons: any) => (

              <div key={crons.id}>
                < CardCron Cron={crons.slug} Scheduled={crons.interval} Mensagem={crons.message} date='teste' />
              </div>
            ))}
          </>
        )}

      </>
    </div >)
}
/*
<div className='bg-white text-center px-8 rounded-xl mx-8 my-4 shadow-md border-2 lg:grid lg:grid-cols-5 '>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Cron</p>
  <p className="">??</p>
</div>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Schesduled</p>
  <p className="">??</p>
</div>
<div className="p-4 col-span-2 ">
  <p className="font-bold">Mensagens</p>
  <p className="">??</p>
</div>
<div className="p-4 lg:my-auto">
  <p className="font-bold">Data</p>
  <p className="">s</p>
</div>

</div> */
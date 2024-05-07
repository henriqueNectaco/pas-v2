type ConteudoCronProps = {
  Cron: string
  Scheduled: string
  Mensagem: string
  date: string
}

export function CardCron(props: ConteudoCronProps) {
  return (
    <>
      <div className="bg-white text-center rounded-lg   border-2 w-full  lg:grid lg:grid-cols-5 ">
        <div className="p-4 lg:my-auto">
          <p className="font-bold">Cron</p>
          <p className="">{props.Cron}</p>
        </div>
        <div className="p-4 lg:my-auto">
          <p className="font-bold">Scheduled</p>
          <p className="">{props.Scheduled}</p>
        </div>
        <div className="p-4 col-span-2 ">
          <p className="font-bold">Mensagem</p>
          <p className="">{props.Mensagem}</p>
        </div>
        <div className="p-4 lg:my-auto">
          <p className="font-bold">Data</p>
          <p className="">{props.date}</p>
        </div>
      </div>
    </>
  )
}

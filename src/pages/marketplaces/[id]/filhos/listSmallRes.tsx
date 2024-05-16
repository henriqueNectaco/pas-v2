import { Spinner } from '@nextui-org/react'
type mktProps = { id: number }
type listProps = { id: number; data: Array }
export default function ListSmallRes(props: listProps) {
  return (
    <div>
      {!props.data ? (
        <Spinner size="lg" />
      ) : (
        <>
          {props.data.map((mkt: mktProps) => (
            <div key={mkt.id}></div>
          ))}
        </>
      )}
    </div>
  )
}

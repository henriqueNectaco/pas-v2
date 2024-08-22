import { Pagination, Button } from '@nextui-org/react'
import { paginatorProps } from '@/types/components'
export default function Paginator(props: paginatorProps) {
  //  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="flex flex-col w-full items-center justify-center ">
      {/* <p className="text-small text-default-500">Selected Page: {currentPage}</p> */}

      <div className="flex gap-2 w-full items-center justify-center flex-row ">
        {props.page !== 1 && (
          <Button
            size="md"
            variant="bordered"
            color="primary"
            onPress={() => {
              // setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              props.onCickPrevious()
            }}
          >
            Previous
          </Button>
        )}

        <Pagination
          classNames={{
            item: 'lg:w-14',
            cursor: 'lg:w-14 bg-blue-500',
            wrapper: '',
          }}
          total={props.total}
          color="secondary"
          page={props.page}
          size="lg"
          onChange={props.onChangeCurrentPage}
        />
        {props.page < props.total && (
          <Button
            size="md"
            variant="bordered"
            color="primary"
            onClick={async () => {
              // await setCurrentPage((prev) =>
              //   prev < props.total ? prev + 1 : prev,
              // )
              props.onClickNext()
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

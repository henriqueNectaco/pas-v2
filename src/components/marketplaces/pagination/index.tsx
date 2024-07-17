import React, { useState } from "react";
import { Pagination, Button } from "@nextui-org/react";

export default function Paginator() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginatorProps, setPaginatorProps] = useState({
    total: 106
  })
  return (
    <div className="flex flex-col w-full gap-5 border items-center justify-center">
      {/* <p className="text-small text-default-500">Selected Page: {currentPage}</p> */}

      <div className="flex gap-2 border w-full items-center justify-center flex-row ">
        <Button
          size="lg"
          variant="bordered"
          color="primary"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Pagination
          classNames={{
            item: 'lg:w-14',
            cursor: 'lg:w-14 bg-blue-500',
            wrapper: ''
          }}
          total={paginatorProps.total}
          color="secondary"
          page={currentPage}
          size="lg"
          onChange={setCurrentPage}
        />
        <Button
          size="lg"
          variant="bordered"
          color="primary"
          onPress={() => setCurrentPage((prev) => (prev < paginatorProps.total ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

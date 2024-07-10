import React, { useEffect, useState } from "react";
import { cn, Pagination, PaginationItemType } from "@nextui-org/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={() => {

          onNext()
          setCurrentPage(value)
          console.log('handleNext e o adsd' + currentPage)

        }}>
          Next
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onPrevious}>
          Prev
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive &&
          "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold",
        )}
        onClick={() => {
          setPage(value);
          setCurrentPage(value);
        }}
      >
        {value}
      </button>
    );
  };

  useEffect(() => {
    console.log('mudou aqui ' + currentPage)
  }, [currentPage]);

  return (
    <div className="w-full flex justify-center">
      <div className=" w-full lg:w-3/4 border flex flex-col items-center justify-center">
        <Pagination
          size="lg"
          disableCursorAnimation
          showControls
          total={106}
          initialPage={1}
          className="gap-2 w-full border border-red-600 flex items-center justify-center"
          radius="full"
          renderItem={renderItem}
          variant="light"
        />
      </div>

      {currentPage === 1 && <p>Conteúdo da página 1</p>}
      {currentPage === 2 && <p>Conteúdo da página 2</p>}
      {currentPage === 3 && <p>Conteúdo da página 3</p>}
      {currentPage === 4 && <p>Conteúdo da página 4</p>}
      {currentPage === 5 && <p>Conteúdo da página 5</p>}
      {currentPage === 6 && <p>Conteúdo da página 6</p>}
      {currentPage === 7 && <p>Conteúdo da página 7</p>}
      {currentPage === 8 && <p>Conteúdo da página 8</p>}
      {currentPage === 9 && <p>Conteúdo da página 9</p>}
      {currentPage === 10 && <p>Conteúdo da página 10</p>}
    </div>
  );
}

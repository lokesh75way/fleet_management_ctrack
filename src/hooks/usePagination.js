import { useState, useEffect, useRef } from "react";

const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalCount, setTotalCount] = useState(0);

  const setCount = (count) => {
    setTotalCount(count);
  };

  const nextPage = () => {
    if (page * pageSize < totalCount) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalCount / pageSize)) {
      setPage(pageNumber);
    }
  };

  return {
    page,
    pageSize,
    totalCount,
    nextPage,
    prevPage,
    goToPage,
    setCount,
    setPage,
  };
};

export default usePagination;

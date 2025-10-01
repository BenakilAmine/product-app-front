import { useState, useMemo, useCallback } from 'react';
import { UsePaginationOptions, UsePaginationReturn } from '../../types/hooks';

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const {
    initialPage = 1,
    initialPageSize = 10,
    total = 0
  } = options;

  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [totalState, setTotalState] = useState(total);

  const totalPages = Math.ceil(totalState / pageSize);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalState);

  const setPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageState(newPage);
    }
  }, [totalPages]);

  const setPageSize = useCallback((newPageSize: number) => {
    setPageSizeState(newPageSize);
    setPageState(1); // Reset to first page when page size changes
  }, []);

  const setTotal = useCallback((newTotal: number) => {
    setTotalState(newTotal);
    // Reset to first page if current page is beyond new total
    if (page > Math.ceil(newTotal / pageSize)) {
      setPageState(1);
    }
  }, [page, pageSize]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  }, [hasNextPage, page, setPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(page - 1);
    }
  }, [hasPreviousPage, page, setPage]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  const getPaginatedData = useCallback(<T>(data: T[]): T[] => {
    return data.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  return {
    page,
    pageSize,
    total: totalState,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    setPage,
    setPageSize,
    setTotal,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    getPaginatedData
  };
}
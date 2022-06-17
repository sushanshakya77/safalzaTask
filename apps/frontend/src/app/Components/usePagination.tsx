import { useState } from 'react';

export type Pagination = Record<'pageSize' | 'pageNumber', number>;

const usePagination = (
  defaultPagination: Pagination = { pageSize: 5, pageNumber: 1 }
) => {
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

  const handlePageNumberChange = (newPage: number) => {
    setPagination({ ...pagination, pageNumber: newPage });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination({ ...pagination, pageSize: newSize, pageNumber: 1 });
  };

  return {
    pagination,
    handlePageNumberChange,
    handlePageSizeChange,
  };
};

export default usePagination;

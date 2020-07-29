import React, { useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container } from './styles';

interface DataProps {
  page_count: number;
  total_items: number;
  current_page: number;
  total_pages: number;
  per_page: number;
}

interface PaginationProps {
  data: DataProps;
  callback(page: number): void;
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  callback,
}: PaginationProps) => {
  const { page_count, total_items, current_page, total_pages, per_page } = data;

  const handlePrevPage = useCallback(() => {
    callback(current_page - 1);
  }, [callback, current_page]);

  const handleNextPage = useCallback(() => {
    callback(current_page + 1);
  }, [callback, current_page]);

  return (
    <Container>
      <p>
        Mostrando <strong>{page_count}</strong> registros. Total:{' '}
        <strong>{total_items}</strong> registros
      </p>
      <div>
        <p>
          Total por página: <strong>{per_page} registros</strong>
        </p>
        <button
          type="button"
          disabled={current_page === 1}
          onClick={handlePrevPage}
        >
          <MdChevronLeft />
        </button>
        <span>{current_page}</span>
        <button
          type="button"
          disabled={total_pages <= current_page}
          onClick={handleNextPage}
        >
          <MdChevronRight />
        </button>
      </div>
    </Container>
  );
};

export default Pagination;

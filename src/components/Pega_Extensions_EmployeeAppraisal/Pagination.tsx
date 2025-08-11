import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={prevDisabled}>
        Prev
      </button>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={nextDisabled}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

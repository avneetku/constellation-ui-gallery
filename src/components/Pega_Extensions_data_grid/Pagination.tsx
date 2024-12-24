import React from 'react';
import type { PaginationProps } from './interfaces';

const Pagination: React.FC<PaginationProps> = ({ handlePageChange, pageNumber, totalPages }) => {
  return (
    <div className="pagination" style={{ marginTop: '10px' }}>
      <button type="button" onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
        Previous
      </button>
      <span style={{ marginLeft: '10px', marginRight: '10px' }}>
        Page {pageNumber} of {totalPages}
      </span>
      <button type="button" onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

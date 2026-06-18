import React from 'react';
import ReactPaginate from 'react-paginate';

function ReactPaginateCommon({ pageCount, currentPage, handlePageClick }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <ReactPaginate
        previousLabel={'Trước'}
        nextLabel={'Sau'}
        pageCount={pageCount}
        forcePage={currentPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination pagination-lg justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link rounded-pill mx-1'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link rounded-pill mx-1'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link rounded-pill mx-1'}
        breakClassName={'page-item'}
        breakLinkClassName={
          'page-link disabled rounded-pill mx-1 border-0 bg-transparent text-muted'
        }
        activeClassName={'active'}
        activeLinkClassName={'bg-warning border-0 text-white'}
        disabledClassName={'disabled'}
      />
    </div>
  );
}

export default ReactPaginateCommon;

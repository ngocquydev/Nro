import React from "react";
import ReactPaginate from "react-paginate";
function ReactPaginateCommon({ pageCount, currentPage, handlePageClick }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={pageCount}
        forcePage={currentPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        disabledClassName={"disabled"}
      />
    </div>
  );
}

export default ReactPaginateCommon;

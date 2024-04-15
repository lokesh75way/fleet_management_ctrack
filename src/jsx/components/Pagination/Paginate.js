import React from "react";
import ReactPaginate from "react-paginate";
import { ICON } from "../../constant/theme";

const Paginate = ({ pageCount, handlePageClick, isRtl }) => {
  return (
    <ReactPaginate
      previousLabel={!isRtl ? ICON.arrowLeft : ICON.arrowRight}
      nextLabel={!isRtl ? ICON.arrowRight : ICON.arrowLeft}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
    />
  );
};

export default Paginate;

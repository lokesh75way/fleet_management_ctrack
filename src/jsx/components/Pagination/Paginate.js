import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { ThemeContext } from "../../../context/ThemeContext";

const Paginate = ({ totalCount, itemsPerPage, handlePageClick }) => {
  const {isRtl} = useContext(ThemeContext);
  const arrowLeft = (<i className="fa-solid fa-angle-left"></i>);
  const arrowRight = (<i className="fa-solid fa-angle-right"></i>)

  const pageCount = Math.ceil(totalCount / itemsPerPage);
  return (
    <ReactPaginate
      previousLabel={!isRtl ? arrowLeft : arrowRight}
      nextLabel={!isRtl ? arrowRight : arrowLeft}
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

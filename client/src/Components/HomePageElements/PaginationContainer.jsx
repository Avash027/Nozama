import React from "react";
import ReactPaginate from "react-paginate";

const PaginationContainer = ({ setCurrentPage, totalPages }) => {
  const handleClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <div className="container" id="app">
      <ReactPaginate
        pageClassName="pagination__numbers"
        previousClassName="material-icons pagination__btn"
        nextClassName="material-icons pagination__btn"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"pagination__dots"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PaginationContainer;

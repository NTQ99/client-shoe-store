/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { getPages, getPagesCount } from "./TablePaginationHelpers";

export function PaginationLinks({ paginationProps }) {
  const { totalSize, sizePerPage, page, paginationSize } = paginationProps;
  const pagesCount = getPagesCount(totalSize, sizePerPage);
  const pages = getPages(page, pagesCount, paginationSize);
  const handleFirstPage = ({ onPageChange }) => {
    onPageChange(1);
  };

  const handlePrevPage = ({ page, onPageChange }) => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = ({ page, onPageChange }) => {
    if (page < pagesCount) {
      onPageChange(page + 1);
    }
  };

  const handleLastPage = ({ onPageChange }) => {
    onPageChange(pagesCount);
  };

  const handleSelectedPage = ({ onPageChange }, pageNum) => {
    onPageChange(pageNum);
  };

  const getHoverStyleButtonBefore = (page) => {
    if (page > 1) return " btn-hover-primary";
    else return " disabled";
  }

  const getHoverStyleButtonAfter = (page, pageCount) => {
    if (page < pageCount) return " btn-hover-primary";
    else return " disabled";
  }

  return (
          <div className={`d-flex flex-wrap py-2 mr-3`} id="pagination_link">
            {/* {pagesCount > 1 && (<> */}
              <a
                onClick={() => handleFirstPage(paginationProps)}
                className={`btn btn-icon btn-sm btn-light${getHoverStyleButtonBefore(page)} mr-2 my-1`}
              >
                <i className="ki ki-bold-double-arrow-back icon-xs" />
              </a>
              <a
                onClick={() => handlePrevPage(paginationProps)}
                className={`btn btn-icon btn-sm btn-light${getHoverStyleButtonBefore(page)} mr-2 my-1`}
              >
                <i className="ki ki-bold-arrow-back icon-xs" />
              </a>
            {/* </>)} */}
            {pages.map((p) => (
              <a
                key={p}
                onClick={() => handleSelectedPage(paginationProps, p)}
                className={`btn btn-icon btn-sm border-0 btn-light ${
                  page === p ? " btn-hover-primary active" : ""
                } mr-2 my-1`}
              >
                {p}
              </a>
            ))}
            {/* {pagesCount > 1 && (<> */}
              <a
                onClick={() => handleNextPage(paginationProps)}
                className={`btn btn-icon btn-sm btn-light${getHoverStyleButtonAfter(page, pagesCount)} mr-2 my-1`}
              >
                <i className="ki ki-bold-arrow-next icon-xs"></i>
              </a>
              <a
                onClick={() => handleLastPage(paginationProps)}
                className={`btn btn-icon btn-sm btn-light${getHoverStyleButtonAfter(page, pagesCount)} mr-2 my-1`}
              >
                <i className="ki ki-bold-double-arrow-next icon-xs"></i>
              </a>
            {/* </>)} */}
          </div>
  );
}

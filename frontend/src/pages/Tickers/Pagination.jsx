import React from "react";
import { TablePagination } from "@mui/material";

const Pagination = ({ page, setPage, pageSize, setPageSize, pageInfo }) => {
  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (!pageInfo) return null;

  return (
    <TablePagination
      component="div"
      count={pageInfo.totalItems}
      page={pageInfo.currentPage - 1}
      onPageChange={handlePageChange}
      rowsPerPage={pageSize}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default Pagination;
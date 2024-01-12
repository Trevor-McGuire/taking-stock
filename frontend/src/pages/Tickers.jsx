import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TICKERS } from "../utils/queries";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";

const Tickers = () => {
  const [page, setPage] = React.useState(2);
  const [pageSize, setPageSize] = React.useState(10);
  const [filter, setFilter] = React.useState({
    grouped_daily: { high: false, low: false },
  });

  const { loading, error, data } = useQuery(GET_ALL_TICKERS, {
    variables: { pagination: { page, pageSize }, filter },
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const { allTickers, pageInfo } = data.getAllTickers;

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setPageSize(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter({ grouped_daily: { high: event.target.checked, low: event.target.checked } });
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.grouped_daily.high}
            onChange={handleFilterChange}
            color="primary"
          />
        }
        label="Filter"
        labelPlacement="start"
        style={{ marginRight: 0 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Market</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>High</TableCell>
            <TableCell>Low</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allTickers.map((ticker) => (
            <TableRow key={ticker.ticker}>
              <TableCell>{ticker.ticker}</TableCell>
              <TableCell>{ticker.name}</TableCell>
              <TableCell>{ticker.market}</TableCell>
              <TableCell>{ticker.type}</TableCell>
              <TableCell>{ticker.grouped_daily.high}</TableCell>
              <TableCell>{ticker.grouped_daily.low}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={pageInfo.totalItems}
        page={pageInfo.currentPage - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pageInfo.pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default Tickers;

import React from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_TICKERS } from "../utils/queries";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";

const Stocks = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_TICKERS, {
    variables: { input: { sort: "asc" } },
  });

  const handleNextPage = () => {
    const nextUrl = data.getTickers.next_url || "";

    // Use fetchMore to fetch the next page without creating a new query
    fetchMore({
      variables: { input: { next_url: nextUrl, sort: "asc" } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    });
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const tickers = data.getTickers.results;

  return (
    <TableContainer component={Paper}>
      <Button onClick={handleNextPage} title={data.getTickers.next_url}>
        Next Page
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickers.map((ticker) => (
            <TableRow key={ticker.ticker}>
              <TableCell>{ticker.ticker}</TableCell>
              <TableCell>{ticker.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Stocks;

import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import TickerTable from "./Table";
import Pagination from "./Pagination";

import { useQuery } from "@apollo/client";
import { GET_ALL_TICKERS } from "../../utils/queries";
import { useNavigate, useLocation } from "react-router-dom";

const Tickers = () => {
  const location = useLocation();
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 2);
  const [pageSize, setPageSize] = useState(Number(localStorage.getItem('pageSize')) || 10);
  const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('filter')) || { grouped_daily: { high: false, low: false } });

  useEffect(() => {
    localStorage.setItem('page', page);
    localStorage.setItem('pageSize', pageSize);
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [page, pageSize, filter]);

  const {
    loading,
    error,
    data = { getAllTickers: { allTickers: [] } },
  } = useQuery(GET_ALL_TICKERS, {
    variables: { pagination: { page, pageSize }, filter },
  });

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Filters filter={filter} setFilter={setFilter} />
      <TickerTable
        allTickers={data.getAllTickers.allTickers}
        pageSize={pageSize}
      />
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageInfo={data.getAllTickers.pageInfo}
      />
    </div>
  );
};

export default Tickers;

import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TickerTable = ({ allTickers, pageSize }) => {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState(null);

  // If data hasn't arrived yet, render template rows
  if (allTickers.length === 0) {
    return (
      <Table>
        <TableBody>
          {Array.from({ length: pageSize }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // If data has arrived, render the actual rows
  return (
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
        {allTickers.map((ticker, index) => (
          <TableRow
            key={ticker.ticker}
            onClick={() => navigate(`/ticker/${ticker.ticker}`)}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              cursor: "pointer",
              backgroundColor: hoveredRow === index ? "#f0f0f0" : "white",
            }}
          >
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
  );
};

export default TickerTable;

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const GET_WEBSOCKET = gql`
  query GetWebsocket {
    getWebsocket {
      price
      symbol
    }
  }
`;

function WebsocketData() {
  const { loading, error, data } = useQuery(GET_WEBSOCKET, {
    pollInterval: 5000,
  });
  const [websocketData, setWebsocketData] = useState([]);
  console.log("websocketData", websocketData);

  useEffect(() => {
    if (data && data.getWebsocket) {
      setWebsocketData((prevData) => {
        const newData = data.getWebsocket.map((item) => {
          const existingItem = prevData.find((i) => i.symbol === item.symbol);
          return {
            symbol: item.symbol,
            price: item.price && !isNaN(item.price) ? parseFloat(item.price).toFixed(2) : null,
            lastPrice: existingItem
              ? parseFloat(existingItem.price).toFixed(2)
              : null,
          };
        });
        if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
          return newData;
        } else {
          return prevData;
        }
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {websocketData
        .filter((item) => item.price !== null)
        .map((item, index) => (
          <Paper key={index} sx={{ margin: "5px", padding: "5px" }}>
            <Typography variant="body1">{item.symbol}</Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="body2">{item.price}</Typography>
              {item.lastPrice !== null &&
                (item.price > item.lastPrice ? (
                  <ArrowDropUpIcon sx={{ color: "green" }} />
                ) : item.price === item.lastPrice ? null : (
                  <ArrowDropDownIcon sx={{ color: "red" }} />
                ))}
            </Box>
          </Paper>
        ))}
    </Box>
  );
}

export default WebsocketData;

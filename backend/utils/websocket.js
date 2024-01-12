require("dotenv").config();
const WebSocket = require("ws");
const { TDWebsocket } = require("../models");

const socket = new WebSocket(
  `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.TWELVEDATA_API_KEY}`
);

socket.onopen = function () {
  console.log("WebSocket connection opened");
  socket.send(
    JSON.stringify({
      action: "subscribe",
      params: {
        symbols: "AAPL,INFY,TRP,QQQ,IXIC,EUR/USD,USD/JPY,BTC/USD",
      },
    })
  );
};

socket.onmessage = async function (event) {
  const message = JSON.parse(event.data);

  if (message.event === "subscribe-status") {
    await TDWebsocket.deleteMany({});
    await TDWebsocket.insertMany(
      message.success.map((item) => ({
        symbol: item.symbol,
        price: 0,
      }))
    );
  }
  if (message.event === "price") {
    await TDWebsocket.updateOne(
      { symbol: message.symbol },
      { price: message.price }
    );
  }
};

socket.onerror = function (error) {
  console.log("WebSocket error:", error);
};

socket.onclose = function () {
  console.log("WebSocket connection closed");
};

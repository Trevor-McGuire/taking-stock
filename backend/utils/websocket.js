// creates a twelvedata websocket connection and updates the database with the current price of the symbols
// called from server.js on startup

require("dotenv").config();
const WebSocket = require("ws");
const { TDWebsocket } = require("../models");
const chalk = require("chalk"); // TD = Red // Polygon = Green // Atlas = Blue // messages = Yellow

const socket = new WebSocket(
  `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.TWELVEDATA_API_KEY}`
);

socket.onopen = function () {
  console.log("WebSocket connection opened");
  const symbols = "AAPL,INFY,TRP,QQQ,IXIC,EUR/USD,USD/JPY,BTC/USD";
  const altSymbols =
    "MQ1:FSX,VOW3:XETR,4BD:XSTU,MAOA:XMUN,ADS:XBER,ADS:DUS,ADS:XHAM,THYAO:BIST";
  socket.send(
    JSON.stringify({
      action: "subscribe",
      params: {
        symbols: symbols,
      },
    })
  );
};

socket.onmessage = async function (event) {
  const message = JSON.parse(event.data);

  if (message.event === "subscribe-status") {
    // takes current symbols in db and compares them to the active symbols from websocket
    // creates currentToDelete and activeToAdd
    // this keeps current symbols in the database and adds new symbols
    const current = await TDWebsocket.find();
    const currentSymbols = current.map((symbol) => symbol.symbol);
    const activeSymbols = message.success.map((symbol) => symbol.symbol);
    const currentToDelete = currentSymbols.filter(
      (symbol) => !activeSymbols.includes(symbol)
    );
    const activeToAdd = activeSymbols.filter(
      (symbol) => !currentSymbols.includes(symbol)
    );
    console.log("activeToAdd", activeToAdd);
    await TDWebsocket.deleteMany({ symbol: { $in: currentToDelete } });
    await TDWebsocket.insertMany(
      activeToAdd.map((symbol) => ({ symbol, price: null }))
    );
    console.log(
      chalk.red("new websocket message:"),
      chalk.yellow(
        message.event +
          ": Deleted [" +
          currentToDelete +
          "] and added [" +
          activeToAdd +
          "]"
      ),
      message.fails
        ? chalk.bgRed(
            "failed to add symbols [" +
              message.fails.map((symbol) => symbol.symbol) +
              "]"
          )
        : ""
    );
  }
  if (message.event === "price") {
    await TDWebsocket.updateOne(
      { symbol: message.symbol },
      { price: message.price }
    );
    console.log(
      chalk.red("new websocket message:"),
      chalk.yellow("price update for " + message.symbol + ": " + message.price)
    );
  }
};

socket.onerror = function (error) {
  console.log("WebSocket error:", error);
};

socket.onclose = function () {
  console.log("WebSocket connection closed");
};

const TDWebsocket = require("../../../models/TDWebsocket");

const resolvers = {
  Query: {
    getWebsocket: async () => {
      try {
        const websocket = await TDWebsocket.find();
        return websocket;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  },
};

module.exports = resolvers;
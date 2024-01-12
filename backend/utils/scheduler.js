const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();
const { Ticker, Article } = require("../models");

// Schedule the resolver to run once daily at 12:00 AM
cron.schedule('0 0 * * *', async () => {
  try {
    await getTickersFromDatabase();
    console.log('Resolver executed successfully');
  } catch (error) {
    console.error('Error executing resolver:', error);
  }
});

//
// getTickersFromDatabase
//

const getTickersFromDatabase = async () => {
  try {
    console.log("Fetching tickers from database...");

    // Fetch all tickers from the database
    const tickers = await Ticker.find();

    // Fetch grouped daily data from the Polygon API
    const polygonData = await fetchPolygonGroupedDailyData();

    // Update each ticker with the corresponding data from the API response
    const updatePromises = tickers.map(async (ticker) => {
      const tickerData = polygonData.results.find((result) => result.T === ticker.ticker);
      if (tickerData) {
        ticker.grouped_daily = {
          high: tickerData.h || null,
          low: tickerData.l || null,
        };
        return ticker.save();
      }
      return null;
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    console.log("Update complete");
  } catch (error) {
    console.error("Error fetching/updating tickers:", error);
    throw new Error("Failed to fetch/update tickers");
  }
};

const fetchPolygonGroupedDailyData = async () => {
  try {
    const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&include_otc=true&apiKey=${process.env.POLYGON_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching GroupedDaily data from Polygon:", error);
    throw new Error("Failed to fetch GroupedDaily data from Polygon");
  }
};

//
// getTickerNews
//

const fetchPolygonTickerNewsData = async () => {
  try {
    // Yesterday's date in UTC to limit the number of results
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Convert to UTC
    date.setHours(date.getHours() - 25); // Subtract 25 hours
    const utcDate = date.toISOString().slice(0, -5) + 'Z';

    const url = `https://api.polygon.io/v2/reference/news?published_utc.gt=${utcDate}&limit=10&apiKey=${process.env.POLYGON_API_KEY}`;
    const response = await axios.get(url);
    const articles = response.data.results;

    const newArticles = [];
    for (const article of articles) {
      const existingArticle = await Article.findOne({ id: article.id });
      if (!existingArticle) {
        newArticles.push(article);
      }
    }

    if (newArticles.length > 0) {
      await Article.insertMany(newArticles);
    }

    console.log(`Imported ${newArticles.length} new articles to the database`);

  } catch (error) {
    console.error("Error fetching TickerNews data from Polygon:", error);
    throw new Error("Failed to fetch TickerNews data from Polygon");
  }
};

fetchPolygonTickerNewsData()

 

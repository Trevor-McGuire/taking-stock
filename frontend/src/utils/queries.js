import { gql } from "@apollo/client";

export const GET_STOCK_PRICE_DATA_AGGREGATES = gql`
  query getStockPriceDataAggregates($input: StockPriceDataInput!) {
    getStockPriceDataAggregates(input: $input) {
      ticker
      queryCount
      resultsCount
      adjusted
      results {
        v
        vw
        o
        c
        h
        l
        t
        n
      }
      status
      request_id
      count
    }
  }
`;

export const GET_TICKERS = gql`
  query getStockPriceDataAggregates($input: TickerInput!) {
      getTickers(input: $input) {
        next_url
        results {
          ticker
          name
        }
      }
  }
`;

export const GET_ALL_TICKERS = gql`
query Query($pagination: PaginationInput, $filter: TickerFilter) {
  getAllTickers(pagination: $pagination, filter: $filter) {
    pageInfo {
      currentPage
      pageSize
      totalItems
      totalPages
    }
    allTickers {
      name
      ticker
      market
      type
      grouped_daily {
        high
        low
      }
    }
  }
}
`;

export const GET_ARTICLES = gql`
query GetArticles($ticker: String) {
  getArticles(ticker: $ticker) {
    amp_url
    article_url
    author
    description
    id
    image_url
    published_utc
    publisher {
      favicon_url
      homepage_url
      logo_url
      name
    }
    tickers
    title
  }
}
`;

export const GET_TICKER_DETAILS = gql`
  query GetTickerDetailsV3($ticker: String!) {
    getTickerDetailsV3(ticker: $ticker) {
      ticker
      name
      market
      locale
      primary_exchange
      type
      active
      currency_name
      cik
      composite_figi
      share_class_figi
      market_cap
      phone_number
      address {
        address1
        city
        state
        postal_code
      }
      description
      sic_code
      sic_description
      ticker_root
      homepage_url
      total_employees
      list_date
      branding {
        logo_url
        icon_url
      }
      share_class_shares_outstanding
      weighted_shares_outstanding
      round_lot
    }
  }
`;
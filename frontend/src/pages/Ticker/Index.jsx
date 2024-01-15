import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import Details from "./Details";
import FullWidth from "../../components/Articles/FullWidth";
import { GET_TICKER_DETAILS } from "../../utils/queries";
import { GET_ARTICLES } from "../../utils/queries";

const Ticker = () => {
  const { ticker } = useParams();

  const {
    loading: loadingDetails,
    error: errorDetails,
    data: dataDetails,
  } = useQuery(GET_TICKER_DETAILS, {
    variables: { ticker },
  });

  const {
    loading: loadingArticles,
    error: errorArticles,
    data: dataArticles,
  } = useQuery(GET_ARTICLES, {
    variables: { ticker },
  });

console.log("dataArticles?.getAllArticles?.articles", dataArticles?.getAllArticles?.articles);
  return (
    <div>
      <Details
        data={dataDetails?.getTickerDetailsV3}
        loading={loadingDetails}
        error={errorDetails}
      />
      <h2>Articles</h2>
      {loadingArticles && <div>Loading...</div>}
      {errorArticles && <div>Error: {errorArticles.message}</div>}
      {dataArticles?.getArticles?.map((article) => (
        <FullWidth key={article.id} article={article} />
      ))}
    </div>
  );
};

export default Ticker;

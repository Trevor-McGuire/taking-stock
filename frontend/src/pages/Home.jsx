import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { GET_ARTICLES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Article from "../components/Article";

export default function Home() {
  const [articles, setArticles] = React.useState([]);
  const { loading, error, data } = useQuery(GET_ARTICLES);

  React.useEffect(() => {
    if (data && data.getArticles) {
      setArticles(data.getArticles);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Link to="/Stocks">Stocks</Link>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </Box>
  );
}
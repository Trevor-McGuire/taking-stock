import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { GET_ARTICLES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Thumbnail from "../components/Articles/Thumbnail";
import Grid from "@mui/material/Grid";
import Headline from "../components/Articles/Headline";

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
    <Box sx={{ 
      width: "100%", 
      overflowX: "auto",
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridAutoRows: '300px',
      gap: 2,
    }}>
      {articles.map((article, index) => (
        <Box 
          sx={{ 
            gridColumn: `span ${index === 0 ? 6 : 2}`,
            gridRow: `span ${index === 0 ? 2 : 1}`,
          }} 
          key={article.id}
        >
          {index === 0 ? <Headline article={article} /> : <Thumbnail article={article} />}
        </Box>
      ))}
    </Box>
  );
}
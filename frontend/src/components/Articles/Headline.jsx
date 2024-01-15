import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Headline = ({ article }) => {
  const handleImageError = (e) => {
    e.target.src = "path/to/your/template/image.jpg"; // replace with your template image path
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <CardActionArea href={article.article_url} target="_blank">
        <CardMedia
          component="img"
          sx={{ height: "200px", width: "100%", objectFit: "contain" }}
          image={article.image_url}
          alt={article.title}
          onError={handleImageError}
        />
        <CardContent sx={{ height: "300px", overflow: "hidden" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Headline;

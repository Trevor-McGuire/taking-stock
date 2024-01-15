import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

const Thumbnail = ({ article }) => {
  const handleImageError = (e) => {
    e.target.src = article.publisher.logo_url;
    
  };

  return (
    <Card sx={{ width: 250 }}>
      <CardActionArea href={article.article_url} target="_blank">
        <CardMedia
          component="img"
          sx={{ height: 140, width: 250, objectFit: 'cover' }}
          image={article.image_url}
          alt={article.title}
          onError={handleImageError}
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {article.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Thumbnail;
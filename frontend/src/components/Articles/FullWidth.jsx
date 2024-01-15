import React from 'react';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const FullWidth = ({ article }) => {

  console.log("article", article);
  return (
    <Card style={{ display: 'flex' }}>
      <CardMedia
        style={{ width: '140px', objectFit: 'congtain', minHeight: "100px", margin: '10px' }}
        image={article.image_url}
        title={article.title}
      />
      <CardContent style={{ flex: '1' }}>
        <Typography variant="h5" component="h2">
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FullWidth;
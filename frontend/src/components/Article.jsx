import React from 'react';

const Article = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <h3>By {article.author}</h3>
      <p>Published at {article.published_utc}</p>
      <p>{article.description}</p>
      <a href={article.article_url}>Read more</a>
      <img src={article.image_url} alt={article.title} />
      <p>Publisher: {article.publisher.name}</p>
      <p>Tickers: {article.tickers.join(', ')}</p>
    </div>
  );
};

export default Article;
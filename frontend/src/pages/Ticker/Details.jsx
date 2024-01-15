import React from "react";

const Details = ({ data, loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>{data.name} ({data.ticker})</h1>
      {data.market && <p>Market: {data.market}</p>}
      {data.locale && <p>Locale: {data.locale}</p>}
      {data.primary_exchange && <p>Primary Exchange: {data.primary_exchange}</p>}
      {data.type && <p>Type: {data.type}</p>}
      {data.active !== null && <p>Active: {data.active ? 'Yes' : 'No'}</p>}
      {data.currency_name && <p>Currency Name: {data.currency_name}</p>}
      {data.cik && <p>CIK: {data.cik}</p>}
      {data.composite_figi && <p>Composite FIGI: {data.composite_figi}</p>}
      {data.share_class_figi && <p>Share Class FIGI: {data.share_class_figi}</p>}
      // Continue with the rest of your fields
    </div>
  );
};

export default Details;
import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const Filters = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter({
      grouped_daily: {
        ...filter.grouped_daily,
        high: event.target.checked,
      },
    });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={filter.grouped_daily.high}
          onChange={handleChange}
          color="primary"
        />
      }
      label="High"
      labelPlacement="start"
      style={{ marginRight: 0 }}
    />
  );
};

export default Filters;
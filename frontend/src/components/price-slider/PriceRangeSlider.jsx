
import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}€`;
}

const minDistance = 30;

const PriceRangeSlider = ({ value, onChange }) => {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      onChange([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      onChange([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const formatMaxValueLabel = (maxValue) => {
    if (maxValue === 1000) {
      return "1000€ <";
    } else {
      return `${maxValue}€`;
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Hinta"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        disableSwap
        max={1000}
        valueLabelFormat={formatMaxValueLabel}
      />
    </Box>
  )
};

export default PriceRangeSlider;
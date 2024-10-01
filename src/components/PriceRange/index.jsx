import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';

const PriceRangeSlider = ({ minPrice, maxPrice, onPriceChange }) => {
  const [values, setValues] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (newValues) => {
    setValues(newValues);
    onPriceChange(newValues[0], newValues[1]);
  };

  return (
    <div className="w-full px-4 py-6">
      <Range
        step={1}
        min={0}
        max={100000}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-1 bg-gray-200 rounded-full"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-bluegray-900 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-bluegray-900 focus:ring-opacity-50"
          />
        )}
      />
      <div className="flex justify-between mt-4">
        <span className="text-gray-500 text-sm">Rs{values[0]}</span>
        <span className="text-gray-500 text-sm">Rs{values[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
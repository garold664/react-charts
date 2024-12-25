import React, { useEffect } from 'react';

export default function Filter({ data, values, setValues, setFilteredData }) {
  useEffect(() => {
    setFilteredData(data.filter((entry) => values.includes(entry.category)));
  }, [values, data, setFilteredData]);
  return (
    <div>
      {[...new Set(data.map((d) => d.category).sort())].map((category) => (
        <span key={`cat-${category}`}>
          <label htmlFor={`cat-${category}`}>{category}</label>
          <input
            type="checkbox"
            value={category}
            id={`cat-${category}`}
            checked={values.includes(category)}
            onChange={(e) => {
              if (e.target.checked) {
                setValues([...values, e.target.value]);
              } else {
                setValues(values.filter((c) => c !== e.target.value));
              }
            }}
          />
        </span>
      ))}
    </div>
  );
}

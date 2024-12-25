import React from 'react';

export default function Filter({ options, data, values, setValues, type }) {
  const updatedSelected = (e) => {
    if (e.target.checked) {
      setValues([...values, e.target.value]);
    } else {
      setValues(values.filter((c) => c !== e.target.value));
    }
  };
  return (
    <div>
      {/* {[...new Set(data.map((d) => d[type]).sort())].map((category) => ( */}
      {options.map((category) => {
        console.log(category.checked);
        return (
          <span key={`cat-${category.name}`}>
            <label htmlFor={`cat-${category.name}`}>{category.name}</label>
            <input
              type="checkbox"
              value={category.name}
              id={`cat-${category.name}`}
              // checked={values.includes(category)}
              checked={category.checked}
              onChange={updatedSelected}
            />
          </span>
        );
      })}
    </div>
  );
}

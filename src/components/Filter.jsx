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
    <div className="filters">
      {options.map((category) => {
        return (
          <label key={`cat-${category.name}`} className="filter-item">
            <span>{category.name}</span>
            <input
              type="checkbox"
              value={category.name}
              checked={category.checked}
              onChange={updatedSelected}
            />
          </label>
        );
      })}
    </div>
  );
}

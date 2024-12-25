import React from 'react';

export default function Sorting({ setSort }) {
  return (
    <div>
      <h2>Сортировка Категорий</h2>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">По умолчанию</option>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </div>
  );
}

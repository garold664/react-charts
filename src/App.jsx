import { useEffect, useState } from 'react';
import './App.css';
import LineChart from './components/LineChart';
import useData from './hooks/useData';

function App() {
  const [data, isLoading, error] = useData();
  const [filteredData, setFilteredData] = useState(data);
  const [categories, setCategories] = useState(
    data.map((d) => ({ name: d.category, checked: true }))
  );
  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    setCategories(data.map((d) => d.category));
  }, [data]);

  useEffect(() => {
    setValues(filteredData.map((d) => d.value));
    setDates(filteredData.map((d) => d.date));
  }, [filteredData]);

  useEffect(() => {
    setFilteredData(
      data.filter((entry) => categories.includes(entry.category))
    );
  }, [categories, data]);

  // console.log(categories);
  const categoryFilter = (
    <div>
      {[...new Set(data.map((d) => d.category).sort())].map((category) => (
        <span key={`cat-${category}`}>
          <label htmlFor={`cat-${category}`}>{category}</label>
          <input
            type="checkbox"
            value={category}
            id={`cat-${category}`}
            checked={categories.includes(category)}
            onChange={(e) => {
              if (e.target.checked) {
                setCategories([...categories, e.target.value]);
              } else {
                setCategories(categories.filter((c) => c !== e.target.value));
              }
            }}
          />
        </span>
      ))}
    </div>
  );

  const transformedData = {
    labels: filteredData.map((d) => d.date),
    datasets: [
      {
        label: 'Dataset 1',
        data: filteredData.map((d) => d.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
        categories: filteredData.map((d) => d.category),
      },
    ],
  };

  const content = isLoading ? (
    'Loading...'
  ) : error ? (
    'Error'
  ) : (
    <LineChart data={transformedData} categories={categories} />
  );

  return (
    <div className="App">
      {categoryFilter}
      {content}
    </div>
  );
}

export default App;

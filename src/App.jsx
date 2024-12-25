import { useEffect, useState } from 'react';
import './App.css';
import LineChart from './components/LineChart';
import useData from './hooks/useData';

function App() {
  const [data, isLoading, error] = useData();

  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setCategories(data.map((d) => d.category));
    setValues(data.map((d) => d.value));
    setDates(data.map((d) => d.date));
  }, [data]);

  const transformedData = {
    labels: dates,
    datasets: [
      {
        label: 'Dataset 1',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
      },
    ],
    categories,
  };

  const content = isLoading ? (
    'Loading...'
  ) : error ? (
    'Error'
  ) : (
    <LineChart data={transformedData} />
  );
  return <div className="App">{content}</div>;
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import ChartModule from './components/ChartModule';
import DatesRangePicker from './components/DatesRangePicker';
import Filter from './components/Filter';
import useData from './hooks/useData';

const categoryColors = {
  A: 'rgba(255, 99, 132, 1)',
  B: 'rgba(54, 162, 235, 1)',
  C: 'rgba(75, 192, 192, 1)',
  D: 'rgba(255, 206, 86, 1)',
  E: 'rgba(153, 102, 255, 1)',
  F: 'rgba(255, 159, 64, 1)',
  G: 'rgba(199, 199, 199, 1)',
};

function App() {
  const [data, isLoading, error] = useData();
  const [filteredData, setFilteredData] = useState(data);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [dates, setDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState(dates);

  useEffect(() => {
    setFilteredData(data);

    const uniqueCategories = [...new Set(data.map((d) => d.category))].map(
      (c) => ({ name: c, checked: true })
    );
    const uniqueDates = [...new Set(data.map((d) => d.date))].map((d) => ({
      name: d,
      checked: true,
    }));
    setCategories(uniqueCategories);
    setDates(uniqueDates);
    setSelectedCategories(uniqueCategories.map((c) => c.name));
    setSelectedDates(uniqueDates.map((d) => d.name));
  }, [data]);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (entry) =>
          selectedDates.includes(entry.date) &&
          selectedCategories.includes(entry.category)
      )
    );
  }, [data, selectedCategories, selectedDates]);

  useEffect(() => {
    setCategories(
      [...new Set(data.map((d) => d.category))].map((c) => ({
        name: c,
        checked: filteredData.find((entry) => entry.category === c)
          ? true
          : false,
      }))
    );
    setDates(
      [...new Set(data.map((d) => d.date))].map((d) => ({
        name: d,
        checked: filteredData.find((entry) => entry.date === d) ? true : false,
      }))
    );
  }, [filteredData, data]);

  const categoryFilter = (
    <Filter
      options={categories}
      data={data}
      values={selectedCategories}
      setValues={setSelectedCategories}
      type="category"
    />
  );

  const datesFilter = (
    <Filter
      options={dates}
      data={data}
      values={selectedDates}
      setValues={setSelectedDates}
      type="date"
    />
  );

  const transformedData = {
    labels: filteredData.map((d) => d.date),
    datasets: [
      {
        label: 'Dataset 1',
        data: filteredData.map((d) => d.value),
        backgroundColor: Object.values(categoryColors),
        hoverOffset: 1,
        borderColor: 'rgb(22, 7, 86)',
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
    <div>
      <ChartModule data={transformedData} categoryColors chartType="line" />
      <ChartModule data={transformedData} categoryColors chartType="bar" />
      <ChartModule data={transformedData} categoryColors chartType="pie" />
    </div>
  );

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <h2>Категории:</h2>
          {categoryFilter}
          <h2>Даты:</h2>
          {datesFilter}
        </div>
      </div>
      <div className="container">
        <DatesRangePicker
          dates={data.map((d) => d.date)}
          setSelectedDates={setSelectedDates}
        />
        {content}
      </div>
    </div>
  );
}

export default App;

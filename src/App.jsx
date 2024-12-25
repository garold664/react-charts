import './App.css';
import useData from './hooks/useData';

function App() {
  const [data, isLoading, error] = useData();

  const content = isLoading
    ? 'Loading...'
    : error
    ? 'Error'
    : data.map((d) => <div key={d.date}>{d.date}</div>);
  return <div className="App">{content}</div>;
}

export default App;

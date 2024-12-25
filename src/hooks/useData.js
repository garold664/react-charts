import { useEffect, useState } from 'react';

const useData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/data.json');
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        const data = await res.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        // console.log(isLoading);
        // console.log(data);
        // console.log(error);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return [data, isLoading, error];
};
export default useData;

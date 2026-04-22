import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (fetchFunction, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const depsKey = JSON.stringify(deps);

  const fetchRef = useRef(fetchFunction);
  useEffect(() => {
    fetchRef.current = fetchFunction;
  }, [fetchFunction]);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRef.current();
      setData(result);
    } catch (err) {
      setError(err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [depsKey, refetch]);

  return { data, loading, error, refetch };
};

export default useFetch;

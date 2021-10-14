import React, { useState, useCallback, useEffect } from 'react';
import authFetch from '../actions/auth_fetch';

const getFetchOptions = (opts) => {
  const fetchOption = { url: '', option: {} };

  if (typeof opts === 'string') {
    fetchOption.url = opts;
  }

  return fetchOption;
};

const useAsyncFetch = (fetchOption, immediate = true) => {
  const [status, setStatus] = useState({ isLoading: false, isSuccess: false, isError: false });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus({ ...status, isLoading: true });

    const asyncFetch = async () => {
      let res = {};
      try {
        const { url, option } = getFetchOptions(fetchOption);
        res = await authFetch(url, option);
        res.jsonData = await res.json();

        if (!res.ok) throw new Error(null);

        setData(res.jsonData);
        setError(null);
      } catch (err) {
        setError(!res.ok ? res.jsonData : null);
        setData(null);
      } finally {
        setStatus({ isLoading: false, isSuccess: res.ok, isError: !res.ok });
      }
    };

    return asyncFetch();
  }, [fetchOption]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute, status, data, error,
  };
};

export default useAsyncFetch;

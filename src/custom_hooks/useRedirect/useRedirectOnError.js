import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const defaultRoute = '/vp/ppl/bids';
const defaultExecute = () => {};

const useRedirectOnError = (execute = defaultExecute, toRoute = defaultRoute, dependency = []) => {
  const history = useHistory();

  useEffect(() => {
    const executeFn = async () => {
      const response = await execute();
      if (!response) {
        history.push(toRoute);
      }
    };
    executeFn();
  }, dependency);
};

export default useRedirectOnError;

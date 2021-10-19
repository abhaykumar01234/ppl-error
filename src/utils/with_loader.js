import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const withLoader = Component =>
  function AddLoader(props) {
    const isLoading = useSelector(state => state.isLoading);

    return (
      <>
        {isLoading && <Loader />}
        <Component {...props} />
      </>
    );
  };

export default withLoader;

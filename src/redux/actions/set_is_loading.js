import { SET_IS_LOADING } from '@ppl/redux/reducers/loading_reducer';

export default function (isLoading) {
  return function setIsLoading(dispatch) {
    dispatch({
      type: SET_IS_LOADING,
      payload: isLoading,
    });
  };
}

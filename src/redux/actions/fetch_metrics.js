import { SET_METRICS } from '@ppl/redux/reducers/metrics_reducer';
import authFetch from './auth_fetch';

export default () => async (dispatch, getState) => {
  const { metrics = {} } = getState();
  if (Object.keys(metrics).length > 0) return null;

  const response = await authFetch('/metrics');

  if (response.ok) {
    const metricsData = await response.json();

    dispatch({
      type: SET_METRICS,
      payload: metricsData
    });
  }

  return null;
};

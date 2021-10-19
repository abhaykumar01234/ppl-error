import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SHIFT_ALERT } from '@ppl/redux/reducers/alerts';

export default function Alerts() {
  const alerts = useSelector(state => state.alerts);
  const dispatch = useDispatch();
  const topAlert = alerts[0];

  if (!topAlert) return null;

  function handleClosed() {
    dispatch({
      type: SHIFT_ALERT
    });
  }

  return React.cloneElement(topAlert, { onClosed: handleClosed });
}

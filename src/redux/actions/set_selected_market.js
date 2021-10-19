import { SET_SELECTED_MARKET } from '@ppl/redux/reducers/selected_market_reducer';

export default function (market) {
  return function setSelectedMarket(dispatch) {
    dispatch({
      type: SET_SELECTED_MARKET,
      payload: market
    });
  };
}

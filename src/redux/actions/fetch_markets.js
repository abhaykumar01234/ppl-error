import { SET_MARKETS } from '@ppl/redux/reducers/markets_reducer';
import authFetch from './auth_fetch';

const marketsSort = (m1, m2) => (m1.name.toLowerCase() < m2.name.toLowerCase() ? -1 : 1);

export default () => async (dispatch, getState) => {
  const { products, markets } = getState();
  if (markets && markets.length > 0) return markets;

  const response = await authFetch('/markets');
  if (!response.ok) throw new Error(response.statusText);

  const marketList = (await response.json()) || [];
  const filteredMarkets = marketList.filter(m =>
    products.some(p => Number(p.marketId) === m.marketId)
  );
  filteredMarkets.sort(marketsSort);

  dispatch({
    type: SET_MARKETS,
    payload: filteredMarkets
  });

  return null;
};

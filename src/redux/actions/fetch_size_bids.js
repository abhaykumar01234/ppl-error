import { SET_AUCTION_BIDS } from '@ppl/redux/reducers/auction_bids_reducer';
import authFetch from './auth_fetch';

export default function (productId, sizeId) {
  return async function fetchSizeBids(dispatch) {
    const response = await authFetch(`/products/${productId}/sizes/${sizeId}/all-bids`);

    if (response.ok) {
      const bids = await response.json();
      const defaultBidToMaxMarketBid = bids.reduce(
        (bidToMaxMarket, { bidValue, bidTakePositionValue }) => {
          bidToMaxMarket[bidValue] = bidToMaxMarket[bidValue] || bidTakePositionValue;
          return bidToMaxMarket;
        },
        {}
      );
      bids.forEach(bid => {
        bid.bidTakePositionValue = defaultBidToMaxMarketBid[bid.bidValue];
      });
      dispatch({
        type: SET_AUCTION_BIDS,
        payload: {
          [`size-${sizeId}`]: { bids, timestamp: Date.now() }
        }
      });

      return bids;
    }
    return Promise.reject(response);
  };
}

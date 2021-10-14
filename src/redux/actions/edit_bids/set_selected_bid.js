import { SET_SELECTED_BID } from '@ppl/redux/reducers/selected_bid_reducer';

export default function (bid) {
  return function setSelectedBid(dispatch, getState) {
    const state = getState();
    const payload = { type: bid.type, productId: bid.productId, changedBidKey: bid.changedBidKey };
    if (bid.type === 'size') {
      payload.bid = state.sizes[bid.productId].find(sizeband => sizeband.id === bid.id);
    } else {
      payload.bid = state.segments[bid.sizeId].find(segment => segment.id === bid.id);
      payload.sizeBid = state.sizes[bid.productId].find(sizeband => sizeband.id === bid.sizeId);
    }
    dispatch({ type: SET_SELECTED_BID, payload });
  };
}

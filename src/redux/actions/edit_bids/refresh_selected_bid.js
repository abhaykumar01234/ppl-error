import { REFRESH_SELECTED_BID } from '@ppl/redux/reducers/selected_bid_reducer';

/** NOTE:- This action will be dispatched after the bid got saved successfully.
 *
 * Need to update the selected bid in the redux.
 * otherwise it will always hold the old value ( which may looks like a change ),
 * until another bid is selected.
 */

export default () => (dispatch, getState) => {
  const state = getState();
  const { selectedBid, sizes, segments } = state || {};

  if ((selectedBid || {}).bid) {
    const { type, productId, bid, sizeBid } = selectedBid;

    if (type === 'size') {
      /* If current selected bid is a 'size' type for which update was called,
       then get the latest value from 'sizes' redux state and update.
       */
      const size = (sizes[productId] || []).find(sizeData => Number(sizeData.id) === Number(bid.id)) || {};
      selectedBid.bid.bidAmount = size.bidAmount || selectedBid.bid.bidAmount;
    } else {
      /* Current selected bid is a 'segment' type for which update was called,
        get the latest value from 'segments' redux state and update.
       */
      const segment = segments[sizeBid.id].find(segmentData => Number(segmentData.id) === Number(bid.id)) || {};
      selectedBid.bid.bid = segment.bid || selectedBid.bid.bid;
    }
  }

  dispatch({ type: REFRESH_SELECTED_BID, payload: selectedBid });
};

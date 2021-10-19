import { SET_CHANGED_BID, DELETE_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import { getNewMaxCostFromAuctionBids, isBidValid } from '@ppl/utils/business';

export default function (bid) {
  return (dispatch, getState) => {
    const { auctionBids, selectedBid } = getState();

    if (bid.key !== selectedBid.changedBidKey) return;

    if (bid.amount === selectedBid.bid.bid) {
      dispatch({
        type: DELETE_CHANGED_BID,
        key: bid.key
      });
      return;
    }

    let newMaxCost;

    const sizeSegmentAuctionBids = auctionBids[`${selectedBid.type}-${selectedBid.bid.id}`];
    if (sizeSegmentAuctionBids) {
      newMaxCost = getNewMaxCostFromAuctionBids(sizeSegmentAuctionBids.bids, bid.amount);
    }

    dispatch({
      type: SET_CHANGED_BID,
      payload: {
        [bid.key]: {
          type: selectedBid.type,
          id: selectedBid.bid.id,
          sizeId: selectedBid.sizeBid && selectedBid.sizeBid.id,
          invalid: !isBidValid(bid.amount, bid.baseCpl),
          label:
            selectedBid.type === 'segment'
              ? `${selectedBid.sizeBid.label} - ${selectedBid.bid.label}`
              : selectedBid.bid.label,
          newValues: {
            bidAmount: bid.amount,
            maxCost: newMaxCost
          },
          oldValues: {
            bidAmount: selectedBid.bid.bidAmount,
            maxCost: selectedBid.bid.maxCost
          }
        }
      }
    });
  };
}

import { createSelector } from 'reselect';

export function getAuctionBidsData(selectedBid, auctionBids) {
  return { selectedBid, auctionBids };
}

export default createSelector(
  state => state.selectedBid,
  state => state.auctionBids,
  getAuctionBidsData,
);

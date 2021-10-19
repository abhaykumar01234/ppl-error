import fetchSizeBids from '../fetch_size_bids';

export default function (productId, refreshSelectedBidAuction = false) {
  return async function fetchAuctionBidData(dispatch, getState) {
    const { auctionBids, selectedBid } = getState();
    let fetchBids = Promise.resolve();
    if (
      selectedBid.type === 'size' &&
      (refreshSelectedBidAuction || !auctionBids[`${selectedBid.type}-${selectedBid.bid.id}`])
    ) {
      fetchBids = dispatch(fetchSizeBids(productId, selectedBid.bid.id));
    }
    fetchBids.catch(error => error);

    return null;
  };
}

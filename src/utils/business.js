/**
 * Let's consider auction bids for an active sizeband/segment is [50, 95, 200, 255, 325, 415, 555, 655, 725]
 *          Bid Amount                           Actual Cost                               Comment
 * (Max $ vendor willing to pay)          (Actual Amount charged)                        
 *            $1000                                 $730                    Some other vendor at 1st position is paying $725. So +5 
 *            $730                                  $730                    Some other vendor at 1st position is paying $725. $730 will make him 1st.
 *            $725                                  $725                    Both the vendors will be charged $725 but earlier one will be holding 1st position.
 *            $700                                  $660                    $655 + $5 = $660
 *            $30                                   $30                     No vendor with such a low bid amount. So bid amount === Actual cost.
 *            $5                                    $5                      No vendor with such a low bid amount. So bid amount === Actual cost.
 */
export const getNewMaxCostFromAuctionBids = (auctionBids, bidAmount) => {
  let updatedBid = auctionBids.reduce((acc, curr) => {
    if (curr <= bidAmount) acc = Math.max(curr, acc);
    return acc;
  }, 0);
  updatedBid = !updatedBid
    ? bidAmount
    : (updatedBid + 5) > bidAmount
      ? updatedBid
      : updatedBid + 5;
  return updatedBid;
};

/**
 * A bid can only be valid if it's -
 * * Not 0 and multiple of 5
 * * Must be higher than baseCPL
 */
const PPL_BID_INCREMENT = 5;
export const isBidValid = (bid, baseAmt) => bid !== 0 && bid % PPL_BID_INCREMENT === 0 && bid > baseAmt;

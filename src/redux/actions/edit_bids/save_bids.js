import React from 'react';
import saveChangedSizeBid from '@ppl/redux/actions/edit_bids/save_changed_size_bid';
import saveChangedSegmentBid from '@ppl/redux/actions/edit_bids/save_changed_segment_bid';
import fetchProductsSizes from '@ppl/redux/actions/fetch_products_sizes';
import fetchSegmentsData from '@ppl/redux/actions/fetch_segments';
import fetchAuctionBidsData from '@ppl/redux/actions/edit_bids/fetch_auction_bids_data';
import { CLEAR_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import pushAlert from '@ppl/redux/actions/edit_bids/push_alert';
import refreshSelectedBid from '@ppl/redux/actions/edit_bids/refresh_selected_bid';
import setIsLoading from '@ppl/redux/actions/set_is_loading';
import SaveBidModal from '@ppl/pages/changed_bids/components/save_bid_modal';
import ErrorBidModal from '@ppl/pages/changed_bids/components/error_bid_modal';

const mapChangedBids = (changedBids = {}) => {
  const changedBidList = Object.values(changedBids);
  const changedSizes = [];
  const changedSegments = [];
  const changedSegmentData = {};

  changedBidList.forEach((bid) => {
    if (bid.type === 'size') {
      changedSizes.push({
        bidAmount: bid.newValues.bidAmount,
        sizeId: bid.id,
      });
    } else {
      changedSegments.push({
        bidAmount: bid.newValues.bidAmount,
        segmentId: bid.id,
        sizeId: bid.sizeId,
      });
    }
  });
  /**
   * Iterate over changedSegments which has all the changed segments bids, arrange them in an object
   * i.e., changedSegmentData, with keeping key as sizeId and value as array of changed segment bids.
   */
  changedSegments.forEach((changedSegmentBid) => {
    const bid = { bidAmount: changedSegmentBid.bidAmount, segmentId: changedSegmentBid.segmentId };
    changedSegmentData[changedSegmentBid.sizeId] = changedSegmentData[changedSegmentBid.sizeId]
      ? [...changedSegmentData[changedSegmentBid.sizeId], bid]
      : [bid];
  });

  return {
    changedSizeData: changedSizes.length > 0 ? changedSizes : null,
    changedSegmentData: Object.keys(changedSegmentData).length > 0 ? changedSegmentData : null,
  };
};

const saveBids = async (changedSizeData, changedSegmentData, dispatch) => {
  const promiseList = [];
  let isSaveBidSuccess = false;

  if (changedSizeData) {
    promiseList.push(
      dispatch(saveChangedSizeBid(changedSizeData)),
    );
  }
  if (changedSegmentData) {
    promiseList.push(
      dispatch(saveChangedSegmentBid(changedSegmentData)),
    );
  }

  try {
    let responseList = await Promise.all(promiseList);
    responseList = responseList.flat();
    isSaveBidSuccess = responseList.length > 0 ? responseList.every(response => response.ok) : false;
  } catch (err) {
    isSaveBidSuccess = false;
  }
  return isSaveBidSuccess;
};

export default productId => (
  async (dispatch, getState) => {
    const { changedBids } = getState();
    const { changedSizeData, changedSegmentData } = mapChangedBids(changedBids);

    const isSaveSuccess = await saveBids(
      changedSizeData,
      changedSegmentData,
      dispatch,
    );

    if (isSaveSuccess) {
      dispatch(pushAlert(<SaveBidModal />));
      dispatch(setIsLoading(true));

      /** refresh right side table data after successful size bid change */
      if (changedSizeData) {
        // TODO: after save, show loader on right side table when all-bids api gets called
        dispatch(fetchAuctionBidsData(productId, true));
        await Promise.all([
          dispatch(fetchSegmentsData(productId, changedSizeData.map(s => s.sizeId), true)),
          dispatch(fetchProductsSizes([productId], true)),
        ]);
      }

      /** fetch segments data if segments got updated  */
      if (changedSegmentData) {
        await dispatch(fetchSegmentsData(productId, Object.keys(changedSegmentData), true));
      }

      dispatch(setIsLoading(false));
      dispatch({ type: CLEAR_CHANGED_BID });
      dispatch(refreshSelectedBid());
    } else {
      dispatch(pushAlert(<ErrorBidModal />));
    }
  }
);

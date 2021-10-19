import authFetch from '../auth_fetch';

const updateSegmentBid = async (changedBid, productId) => {
  const promiseList = [];

  Object.entries(changedBid).forEach(([sizeId, newBidList]) => {
    const url = `/products/${productId}/sizes/${sizeId}/segments`;
    promiseList.push(
      authFetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        // TODO: add real userId here
        body: JSON.stringify({ userId: 0, bids: newBidList })
      })
    );
  });
  const response = await Promise.all(promiseList);
  return response;
};

export default changedBid => async (dispatch, getState) => {
  const { selectedBid } = getState();
  const response = await updateSegmentBid(changedBid, selectedBid.productId);
  return response;
};

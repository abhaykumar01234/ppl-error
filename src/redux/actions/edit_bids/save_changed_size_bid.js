import authFetch from '../auth_fetch';

export default changedBid => (
  async (dispatch, getState) => {
    const { selectedBid } = getState();
    const url = `/products/${selectedBid.productId}/sizes`;
    const response = await authFetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 0, bids: changedBid }),
    });

    return response;
  }
);

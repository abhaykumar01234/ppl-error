export const SET_AUCTION_BIDS = 'SET_AUCTION_BIDS';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUCTION_BIDS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

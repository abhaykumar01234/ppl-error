export const SET_CHANGED_BID = 'SET_CHANGED_BID';
export const DELETE_CHANGED_BID = 'DELETE_CHANGED_BID';
export const CLEAR_CHANGED_BID = 'CLEAR_CHANGED_BID';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CHANGED_BID:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_CHANGED_BID: {
      const newChangedBids = { ...state };
      delete newChangedBids[action.key];
      return newChangedBids;
    }
    case CLEAR_CHANGED_BID:
      return {};
    default:
      return state;
  }
};

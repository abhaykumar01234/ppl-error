export const SET_SELECTED_BID = 'SET_SELECTED_BID';
export const REFRESH_SELECTED_BID = 'REFRESH_SELECTED_BID';

export default (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_BID:
      return {
        ...state,
        ...action.payload
      };
    case REFRESH_SELECTED_BID:
      return action.payload;
    default:
      return state;
  }
};

export const SET_SELECTED_MARKET = 'SET_SELECTED_MARKET';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_MARKET:
      return action.payload;
    default:
      return state;
  }
};

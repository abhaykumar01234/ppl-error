export const SET_MARKETS = 'SET_MARKETS';

export default (state = [], action) => {
  switch (action.type) {
    case SET_MARKETS:
      return action.payload;
    default:
      return state;
  }
};

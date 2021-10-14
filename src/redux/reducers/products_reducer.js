export const SET_PRODUCTS = 'SET_PRODUCTS';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

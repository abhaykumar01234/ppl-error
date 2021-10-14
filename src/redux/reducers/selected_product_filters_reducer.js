export const SET_SELECTED_PRODUCT_FILTERS = 'SET_SELECTED_PRODUCT_FILTERS';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT_FILTERS:
      return action.payload;
    default:
      return state;
  }
};

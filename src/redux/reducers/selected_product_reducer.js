export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

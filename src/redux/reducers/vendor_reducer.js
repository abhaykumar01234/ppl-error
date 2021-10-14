export const SET_VENDOR = 'SET_VENDOR';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_VENDOR:
      return action.payload;
    default:
      return state;
  }
};

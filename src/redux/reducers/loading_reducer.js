export const SET_IS_LOADING = 'SET_IS_LOADING';

export default (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default:
      return state;
  }
};

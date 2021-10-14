export const SET_SIZES = 'SET_SIZES';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SIZES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const SET_METRICS = 'SET_METRICS';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_METRICS:
      return action.payload;
    default:
      return state;
  }
};

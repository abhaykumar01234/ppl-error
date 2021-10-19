export const SET_SEGMENTS = 'SET_SEGMENT';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SEGMENTS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const SET_LEADS_LIST = 'SET_LEADS_LIST';

export default (state = [], action) => {
  switch (action.type) {
    case SET_LEADS_LIST:
      return action.payload;
    default:
      return state;
  }
};

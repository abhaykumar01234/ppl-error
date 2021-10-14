export const SET_LEADS_REPORT = 'SET_LEADS_REPORT';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LEADS_REPORT:
      return action.payload;
    default:
      return state;
  }
};

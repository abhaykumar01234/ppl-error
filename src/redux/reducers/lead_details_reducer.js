export const SET_LEAD_DETAILS = 'SET_LEAD_DETAILS';
export const UNSET_LEAD_DETAILS = 'UNSET_LEAD_DETAILS';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LEAD_DETAILS:
      return action.payload;
    case UNSET_LEAD_DETAILS:
      return {};
    default:
      return state;
  }
};

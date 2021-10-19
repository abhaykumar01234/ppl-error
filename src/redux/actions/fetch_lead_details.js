import { SET_LEAD_DETAILS } from '@ppl/redux/reducers/lead_details_reducer';
import authFetch from './auth_fetch';
import setIsLoading from './set_is_loading';

export default function (leadId) {
  return async function fetchLeadDetails(dispatch) {
    dispatch(setIsLoading(true));
    try {
      const response = await authFetch(`/leads/${leadId}`);
      let leadDetails = null;

      if (response.ok) {
        leadDetails = await response.json();

        dispatch({
          type: SET_LEAD_DETAILS,
          payload: leadDetails
        });
      }

      dispatch(setIsLoading(false));
      return leadDetails;
    } catch (e) {
      dispatch(setIsLoading(false));
      return null;
    }
  };
}

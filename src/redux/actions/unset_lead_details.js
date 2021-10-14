import { UNSET_LEAD_DETAILS } from '@ppl/redux/reducers/lead_details_reducer';

export default function () {
  return function unsetLeadDetails(dispatch) {
    dispatch({
      type: UNSET_LEAD_DETAILS,
    });
  };
}

import fetchLeadDetails from '../fetch_lead_details';

export default function (leadId) {
  return async function fetchViewLeadDetails(dispatch) {
    const response = await dispatch(fetchLeadDetails(leadId));
    return response;
  };
}

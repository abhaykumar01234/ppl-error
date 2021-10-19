import { SET_LEADS_LIST } from '@ppl/redux/reducers/leads_reducer';
import { VpComponents } from '@vp-components';
import authFetch from './auth_fetch';

export default function (vendorId, queryParams = {}) {
  return async function fetchLeads(dispatch) {
    const response = await authFetch(`/leads?${VpComponents.toQueryString(queryParams)}`);

    if (response.ok) {
      const leads = await response.json();

      dispatch({
        type: SET_LEADS_LIST,
        payload: leads
      });

      return leads;
    }

    return null;
  };
}

import { SET_LEADS_REPORT } from '@ppl/redux/reducers/leads_report_reducer';
import { VpComponents } from '@vp-components';
import authFetch from './auth_fetch';

export default function (vendorId, queryParams = {}) {
  return async function fetchLeadsReport(dispatch) {
    const response = await authFetch(`/leads/report?${VpComponents.toQueryString(queryParams)}`);

    if (response.ok) {
      const leadsReport = await response.json();

      dispatch({
        type: SET_LEADS_REPORT,
        payload: leadsReport
      });

      return leadsReport;
    }

    return null;
  };
}

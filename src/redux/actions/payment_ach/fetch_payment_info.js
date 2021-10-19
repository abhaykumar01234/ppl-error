import fetchVendor from '../fetch_vendor';
import setIsLoading from '../set_is_loading';
import authFetch from '../auth_fetch';

export default (billId, fetchOptions) => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    dispatch(fetchVendor());
    const res = await authFetch(`/invoices/${billId}/payment`, fetchOptions);
    const data = await res.json();

    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    if (err.name === 'AbortError') return { aborted: true };
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

import setVendor from './set_vendor';
import authFetch from './auth_fetch';

export default () => async (dispatch, getState) => {
  const { vendor } = getState();
  if (vendor && vendor.name) return vendor;

  const vendorResponse = await authFetch('/vendors');
  if (!vendorResponse.ok) throw new Error(vendorResponse.statusText);

  const vendorInfo = (await vendorResponse.json()) || {};
  dispatch(setVendor(vendorInfo));

  return null;
};

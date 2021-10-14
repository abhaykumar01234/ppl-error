import { SET_VENDOR } from '@ppl/redux/reducers/vendor_reducer';

export default function (vendor) {
  return function setVendor(dispatch) {
    dispatch({
      type: SET_VENDOR,
      payload: vendor,
    });
  };
}

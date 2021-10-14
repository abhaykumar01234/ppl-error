import fetchProducts from '../fetch_products';
import fetchMarkets from '../fetch_markets';
import fetchMetrics from '../fetch_metrics';
import fetchVendor from '../fetch_vendor';
import setIsLoading from '../set_is_loading';

export default () => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    await Promise.all([
      dispatch(fetchVendor()),
      dispatch(fetchProducts()),
      dispatch(fetchMetrics()),
    ]);
    await dispatch(fetchMarkets());
  } catch (error) {
    throw new Error(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

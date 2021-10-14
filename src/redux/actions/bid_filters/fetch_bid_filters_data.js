import fetchProducts from '../fetch_products';
import fetchMarkets from '../fetch_markets';
import fetchVendor from '../fetch_vendor';
import fetchFilters from './fetch_filters';
import setIsLoading from '../set_is_loading';

export default () => async (dispatch, getState) => {
  const { selectedProduct } = getState();
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchVendor());
    await dispatch(fetchProducts());
    await dispatch(fetchMarkets());
    if (selectedProduct.productId) await dispatch(fetchFilters());
  } catch(e) {
    console.error('fetch_bid_filters_data =>', e);
    throw e;
  } finally {
    dispatch(setIsLoading(false));
  }
};

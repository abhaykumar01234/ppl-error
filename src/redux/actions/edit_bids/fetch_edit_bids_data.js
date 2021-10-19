import fetchMarkets from '../fetch_markets';
import fetchProducts from '../fetch_products';
import fetchProductsSizes from '../fetch_products_sizes';
import fetchVendor from '../fetch_vendor';
import setIsLoading from '../set_is_loading';

export default productId => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const [sizeBand] = (await dispatch(fetchProductsSizes([productId]))) || [];
    if (!sizeBand) return null;

    await Promise.all([dispatch(fetchProducts()), dispatch(fetchVendor())]);
    await dispatch(fetchMarkets());

    return true;
  } catch (err) {
    return null;
  } finally {
    dispatch(setIsLoading(false));
  }
};

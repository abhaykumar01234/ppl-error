import authFetch from '../auth_fetch';
import setSelectedProductFilters from '../set_selected_product_filters';

export default () => async (dispatch, getState) => {
  const { selectedProduct } = getState();
  const response = await authFetch(`/products/${selectedProduct.productId}/filters`);
  if (!response.ok) throw new Error(response.statusText);
  const responseData = await response.json();
  dispatch(setSelectedProductFilters(responseData));
};

import setProducts from './set_products';
import authFetch from './auth_fetch';

const productsSort = (p1, p2) =>
  p1.productLabel.toLowerCase() < p2.productLabel.toLowerCase() ? -1 : 1;

export default () => async (dispatch, getState) => {
  const { products } = getState();
  if (products && products.length > 0) return products;

  const response = await authFetch('/products');
  if (!response.ok) throw new Error(response.statusText);

  let productList = (await response.json()) || [];
  productList = productList.filter(p => p.productBiddingAvailable);
  productList.sort(productsSort);

  dispatch(setProducts(productList));

  return null;
};

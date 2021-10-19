import { createSelector } from 'reselect';

export function getSelectedProduct(products, productId) {
  return products.find(p => p.productId === productId);
}

export default createSelector(
  state => state.products,
  (_, productId) => productId,
  getSelectedProduct
);

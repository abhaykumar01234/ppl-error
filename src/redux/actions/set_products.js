import { SET_PRODUCTS } from '@ppl/redux/reducers/products_reducer';

export default function (products) {
  return function setProducts(dispatch) {
    dispatch({
      type: SET_PRODUCTS,
      payload: products
    });
  };
}

import { SET_SELECTED_PRODUCT } from '@ppl/redux/reducers/selected_product_reducer';

export default function (product) {
  return function setSelectedProduct(dispatch) {
    dispatch({
      type: SET_SELECTED_PRODUCT,
      payload: product,
    });
  };
}

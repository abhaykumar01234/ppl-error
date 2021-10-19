import { SET_SELECTED_PRODUCT_FILTERS } from '@ppl/redux/reducers/selected_product_filters_reducer';

export default function (product) {
  return function setSelectedProductFilters(dispatch) {
    dispatch({
      type: SET_SELECTED_PRODUCT_FILTERS,
      payload: product
    });
  };
}

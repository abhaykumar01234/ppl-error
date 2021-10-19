import { createSelector } from 'reselect';
import getProduct from '@ppl/selectors/get_product';

export function getEditPageData(segments, sizes, changedBids, activeProduct) {
  return {
    segments,
    sizes,
    changedBids,
    activeProduct
  };
}

export default createSelector(
  state => state.segments,
  state => state.sizes,
  state => state.changedBids,
  getProduct,
  getEditPageData
);

import { SET_SEGMENTS } from '@ppl/redux/reducers/segments_reducer';
import authFetch from './auth_fetch';

export default (productId, sizeIdList = [], refresh = false) =>
  async (dispatch, getState) => {
    const { segments, products = [] } = getState();
    const isProductBiddable = (products.find(p => Number(p.productId) === Number(productId)) || {})
      .advancedBiddingAvailable;

    if (!isProductBiddable || (!refresh && sizeIdList.length === 1 && segments[sizeIdList[0]]))
      return null;
    const promiseList = sizeIdList.map(sizeId =>
      authFetch(`/products/${productId}/sizes/${sizeId}/segments`)
        .then(response => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then(segmentData => ({
          [sizeId]: segmentData
        }))
        .catch(() => false)
    );

    try {
      let segmentResponses = await Promise.all(promiseList);
      segmentResponses = segmentResponses.filter(Boolean);
      if (segmentResponses.length === 0) throw new Error();

      dispatch({
        type: SET_SEGMENTS,
        payload: Object.assign({}, segments, ...segmentResponses)
      });

      return null;
    } catch (error) {
      throw new Error(error);
    }
  };

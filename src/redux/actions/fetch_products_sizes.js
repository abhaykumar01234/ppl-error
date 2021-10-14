import { SET_SIZES } from '@ppl/redux/reducers/sizes_reducer';
import authFetch from './auth_fetch';

export default (productIdList, refresh = false) => async (dispatch, getState) => {
  const { sizes } = getState();
  if (!refresh && sizes[productIdList[0]]) return null;

  try {
    const sizesPromiseList = productIdList.map(productId => authFetch(`/products/${productId}/sizes`)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => ({ [productId]: data }))
      .catch(() => false));

    const responses = await Promise.all(sizesPromiseList);
    const responseList = responses.filter(Boolean);

    if (responseList.length === 0) throw new Error();

    let sizesData;
    responseList.forEach((response) => { sizesData = { ...sizesData, ...response }; });

    dispatch({
      type: SET_SIZES,
      payload: sizesData,
    });

    return responseList;
  } catch (error) {
    throw new Error(error);
  }
};

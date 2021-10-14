import React, { useEffect, useState } from 'react';
import { LoadingOverlay } from '@capterra/arubaito';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux';
import fetchBidFiltersData from '@ppl/redux/actions/bid_filters/fetch_bid_filters_data';
import BidFiltersHeader from './components/bid_filters_header';
import BID_FILTER_CONFIG from './config/bid_filters_config';
import UpdateFiltersInfoBox from './components/update_filters_info_box';

const BidFilters = () => {
  const dispatch = useDispatch();
  const {
    vendor,
    markets,
    selectedMarket,
    products,
    selectedProduct,
    selectedProductFilters,
    isLoading
  } = useSelector(state => state);

  const [isFetchError, setFetchError] = useState(false);

  useEffect(() => {
    dispatch(fetchBidFiltersData())
      .then(() => { setFetchError(false); })
      .catch(() => { setFetchError(true); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarket, selectedProduct]);

  return (
    <div className="gdm-grid">
      <div className="gdm-row">
        {isLoading && <LoadingOverlay light />}
        <div data-cy="title" className="gdm-w-24 gdm-p-left-xs gdm-title">PPL Bid Filters</div>
        <div className="gdm-col gdm-col-16">
          <BidFiltersHeader
            markets={markets}
            selectedMarket={selectedMarket}
            products={products}
            selectedProduct={selectedProduct}
            dispatch={dispatch}
          />
          {isFetchError ? (
            <div className="gdm-w-24 gdm-label">
              We have experienced an error. Please try changing the product.
            </div>
          ) : BID_FILTER_CONFIG.map(({ heading, headingNote, getComponent }) => (
            <div key={heading} className="gdm-m-top-md">
              <div className="gdm-heading-lg" data-cy={heading}>{heading}</div>
              <div className="gdm-paragraph-sm">{headingNote}</div>
              <div className="gdm-row gdm-m-top-md">{getComponent(selectedProductFilters)}</div>
            </div>
          ))}
        </div>
        <div className="gdm-col gdm-col-8">
          <UpdateFiltersInfoBox representative={vendor.representative} />
        </div>
      </div>
    </div>
  );
};

export default BidFilters;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchEditBidsData from '@ppl/redux/actions/edit_bids/fetch_edit_bids_data';
import fetchAuctionBidsData from '@ppl/redux/actions/edit_bids/fetch_auction_bids_data';
import withLoader from '@ppl/utils/with_loader';
import { useRedirectOnError } from '@ppl/custom_hooks/useRedirect';
import cx from 'classnames';
import Table from './edit_bids_table';
import AuctionBids from './edit_bids_auction_bids';
import AuctionBidsPlaceholder from '../components/auction_bids_placeholder';
import SegmentAuctionBids from '../components/segment_auction_bids';
import s from './edit_bids.module.scss';

const FALLBACK = '';

const EditPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { products, markets, sizes } = useSelector(state => state);

  const selectedBid = useSelector(state => state.selectedBid);
  const selectedMarket = useSelector(state => state.selectedMarket || {});
  const selectedProduct =
    useSelector(state => state.products || []).find(p => p.productId === productId) || {};

  useRedirectOnError(async () => {
    let bidsData = {};
    if (!sizes[productId]) {
      bidsData = await dispatch(fetchEditBidsData(productId));
    }
    return bidsData;
  });

  useEffect(() => {
    if (selectedBid) {
      dispatch(fetchAuctionBidsData(productId));
    }
  }, [selectedBid]);

  const AuctionView = () => {
    if (!selectedBid) return <AuctionBidsPlaceholder />;
    if (selectedBid.type === 'size') return <AuctionBids />;
    return <SegmentAuctionBids selectedBid={selectedBid} />;
  };

  const getMarketName = prodId => {
    if (!selectedMarket.name) {
      const { marketId } = products.find(p => p.productId === prodId) || {};
      return (markets.find(m => m.marketId === Number(marketId)) || {}).name || FALLBACK;
    }
    return selectedMarket.name;
  };

  const getProductName = prodId => {
    if (!selectedProduct.productLabel) {
      return (products.find(p => p.productId === prodId) || {}).productLabel || FALLBACK;
    }
    return selectedProduct.productLabel;
  };

  return (
    <div>
      <header>
        <span className="gdm-block gdm-heading-lg">{getMarketName(productId)}</span>
        <span className="gdm-block gdm-title">{getProductName(productId)}</span>
      </header>
      <div className={cx('gdm-grid gdm-m-top-lg', s['grid-wrapper'])}>
        <div className="gdm-row">
          <div className="gdm-col gdm-no-p gdm-col-14">
            <Table productId={productId} />
          </div>
          <div className="gdm-col gdm-no-p gdm-col-9 gdm-col-offset-1">
            <div className={s['right-pane']}>
              <AuctionView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoader(EditPage);

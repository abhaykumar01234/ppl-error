import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchProductsSizes from '@ppl/redux/actions/fetch_products_sizes';
import fetchManageBidsData from '@ppl/redux/actions/manage_bids/fetch_manage_bids_data';
import withLoader from '@ppl/utils/with_loader';
import Header from './manage_bids_header';
import Table from '../components/manage_bids_table';
import Footer from '../components/manage_bids_footer';

const ManageBids = () => {
  const [isFetchError, setFetchError] = useState(false);
  const dispatch = useDispatch();
  const [selectedMarketProducts, setSelectedMarketProducts] = useState([]);
  const { vendor, sizes, markets, metrics, selectedMarket, products, isLoading } = useSelector(
    state => state
  );

  useEffect(() => {
    dispatch(fetchManageBidsData())
      .then(() => {
        setFetchError(false);
      })
      .catch(() => {
        setFetchError(true);
      });
  }, []);

  useEffect(() => {
    /* Fetch product sizes when market is selected from dropdown
     * Set Products in the table which are related to current selected market */
    if (selectedMarket && selectedMarket.marketId) {
      const currentMarketProducts = products.filter(
        product => Number(product.marketId) === Number(selectedMarket.marketId)
      );
      const productIdList = currentMarketProducts.map(product => product.productId);
      dispatch(fetchProductsSizes(productIdList))
        .then(() => {
          setFetchError(false);
        })
        .catch(() => {
          setFetchError(true);
        });
      setSelectedMarketProducts(currentMarketProducts);
    }
  }, [selectedMarket]);

  return (
    <>
      <Header markets={markets} vendor={vendor} selectedMarket={selectedMarket} />
      <Table
        products={selectedMarketProducts}
        sizes={sizes}
        metrics={metrics || {}}
        isLoading={isLoading}
        isFetchError={isFetchError}
      />
      <Footer />
    </>
  );
};

export default withLoader(ManageBids);

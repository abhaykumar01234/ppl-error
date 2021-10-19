import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Dropdown } from '@capterra/arubaito';
import setSelectedMarket from '@ppl/redux/actions/set_selected_market';
import setSelectedProduct from '@ppl/redux/actions/set_selected_product';

const BidFiltersHeader = ({ markets, selectedMarket, products, selectedProduct, dispatch }) => {
  const defaultMarket = selectedMarket.marketId
    ? selectedMarket
    : (markets.length > 0 && markets[0]) || {};

  const setMarket = market =>
    selectedMarket.marketId !== market.marketId && dispatch(setSelectedMarket(market));

  const setProduct = product => {
    if (!selectedProduct.productId) dispatch(setSelectedProduct(products[0]));
    return selectedProduct.productId !== product.productId && dispatch(setSelectedProduct(product));
  };

  return (
    <>
      <div className="gdm-m-top-md gdm-m-bottom-sm">
        <span className="gdm-m-right-xs">
          <Dropdown
            list={markets}
            selected={defaultMarket}
            selectCallback={setMarket}
            render={selected => (
              <Dropdown.Selected>{selected ? selected.name : 'Select Market'}</Dropdown.Selected>
            )}
            displayValue="name"
          >
            <Dropdown.List
              render={item => (
                <Dropdown.ListItem key={item.marketId} item={item}>
                  {item.name}
                </Dropdown.ListItem>
              )}
            />
          </Dropdown>
        </span>
        <span className="gdm-m-left-xs">
          {selectedMarket && selectedMarket.marketId && (
            <Dropdown
              selected={selectedProduct}
              selectCallback={setProduct}
              list={products.filter(pr => Number(pr.marketId) === Number(selectedMarket.marketId))}
              render={selected => (
                <Dropdown.Selected>
                  {selected ? selected.productLabel : 'Select Product'}
                </Dropdown.Selected>
              )}
              displayValue="productLabel"
            >
              <Dropdown.List
                render={item => (
                  <Dropdown.ListItem key={item.productId} item={item}>
                    {item.productLabel}
                  </Dropdown.ListItem>
                )}
              />
            </Dropdown>
          )}
        </span>
      </div>
    </>
  );
};

BidFiltersHeader.defaultProps = {
  markets: [],
  selectedMarket: {
    marketId: 0
  },
  products: [],
  selectedProduct: {
    productId: 0
  },
  dispatch: () => {}
};

BidFiltersHeader.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object),
  selectedMarket: PropTypes.shape({ marketId: PropTypes.number }),
  products: PropTypes.arrayOf(PropTypes.object),
  selectedProduct: PropTypes.shape({
    productId: PropTypes.string
  }),
  dispatch: PropTypes.func
};

export default BidFiltersHeader;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import setSelectedMarket from '@ppl/redux/actions/set_selected_market';
import PropTypes from 'prop-types';
import { Dropdown } from '@arubaito';

const Header = ({ markets, vendor, selectedMarket }) => {
  const dispatch = useDispatch();
  const defaultMarket = selectedMarket.marketId ? selectedMarket : (markets.length > 0 && markets[0]) || {};

  const setMarket = market => dispatch(setSelectedMarket(market));

  useEffect(() => {
    if (markets && markets.length > 0) {
      setMarket(defaultMarket);
    }
  }, [markets]);

  return (
    <div className="gdm-m-bottom-md gdm-z-index-dropdown">
      <h1 data-cy="vendor-name" className="gdm-title gdm-m-bottom-md">{vendor.name}</h1>
      {Boolean(markets.length) && (
        <>
          {markets.length === 1 ? (
            <span data-cy="market-name" className="gdm-heading-lg">{defaultMarket.name}</span>
          ) : (
            <Dropdown
              data-cy="markets-dropdown"
              selectCallback={setMarket}
              selected={defaultMarket}
              render={selected => (
                <Dropdown.Selected data-cy="market-name">
                  {selected ? selected.name : 'Select Market'}
                </Dropdown.Selected>
              )}
              displayValue="name"
              list={markets}
            >
              <label className="gdm-label">Search your markets by name</label>
              <Dropdown.Search autoComplete="off" />
              <Dropdown.List
                render={item => (
                  <Dropdown.ListItem
                    data-cy={`dropdown-list-item-${item.name}`}
                    item={item}
                    key={item.marketId}
                  >
                    {item.name}
                  </Dropdown.ListItem>
                )}
              />
            </Dropdown>
          )}
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  markets: PropTypes.arrayOf(PropTypes.object).isRequired,
  vendor: PropTypes.shape({ name: PropTypes.string, id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]), }).isRequired,
  selectedMarket: PropTypes.shape({ marketId: PropTypes.number, name: PropTypes.string }).isRequired,
};

export default Header;

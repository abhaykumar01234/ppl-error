import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import groupCountries from '../utils/group_countries';
import CheckboxView from './checkbox_view';

const FilterCountries = ({ countries }) => {
  if (countries.length === 0) return null;

  const groupedCountries = groupCountries(countries);

  return groupedCountries.map(gc => (
    <div key={gc.name} className="gdm-col gdm-col-24 gdm-m-bottom-md">
      <CheckboxView label={gc.name} items={gc.countries} wrapperStyle={{ columnCount: 3 }} />
    </div>
  ));
};

FilterCountries.defaultProps = {
  countries: []
};

FilterCountries.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object)
};

export default FilterCountries;

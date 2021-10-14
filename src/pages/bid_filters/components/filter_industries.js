import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import CheckboxView from './checkbox_view';
import '../bid_filters.scss';

const FilterIndustries = ({ industries }) => {
  if (industries.length === 0) return null;

  return (
    <div className="gdm-col gdm-col-24" moduleClassName="three-columns">
      <CheckboxView items={industries} />
    </div>
  );
};

FilterIndustries.defaultProps = {
  industries: [],
};

FilterIndustries.propTypes = {
  industries: PropTypes.arrayOf(PropTypes.object),
};

export default FilterIndustries;

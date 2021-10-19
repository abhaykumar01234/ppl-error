import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import cx from 'classnames';
import CheckboxView from './checkbox_view';
import s from '../bid_filters.module.scss';

const FilterIndustries = ({ industries }) => {
  if (industries.length === 0) return null;

  return (
    <div className={cx('gdm-col gdm-col-24', s['three-columns'])}>
      <CheckboxView items={industries} />
    </div>
  );
};

FilterIndustries.defaultProps = {
  industries: []
};

FilterIndustries.propTypes = {
  industries: PropTypes.arrayOf(PropTypes.object)
};

export default FilterIndustries;

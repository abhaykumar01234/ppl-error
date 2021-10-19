import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import CheckboxView from './checkbox_view';

const FilterSizes = ({ sizes }) => {
  if (sizes.length === 0) return null;

  return (
    <>
      {sizes.map(size => (
        <div key={size.label} className="gdm-col gdm-col-8">
          <CheckboxView label={size.label} items={size.items} />
        </div>
      ))}
    </>
  );
};

FilterSizes.defaultProps = {
  sizes: []
};

FilterSizes.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.object)
};

export default FilterSizes;

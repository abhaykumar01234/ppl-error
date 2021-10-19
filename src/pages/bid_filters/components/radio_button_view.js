import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { FormControlLabel, Radio } from '@arubaito';

const RadioButtonView = ({ options, functionality }) => {
  const handleChange = () => {};

  return (
    <div className="gdm-m-top-xs">
      <Radio.Group value="" name="radioOptions" onChange={handleChange}>
        {options.map(option => (
          <div key={option.label}>
            <FormControlLabel
              label={option.label}
              control={
                <Radio.Button
                  checked={option.value === functionality.weight}
                  value={option.value}
                  className="gdm-z-index-deep"
                  disabled
                />
              }
              disabled
            />
          </div>
        ))}
      </Radio.Group>
    </div>
  );
};

RadioButtonView.defaultProps = {
  options: [],
  functionality: { weight: null }
};

RadioButtonView.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  functionality: PropTypes.shape({ weight: PropTypes.number })
};

export default RadioButtonView;

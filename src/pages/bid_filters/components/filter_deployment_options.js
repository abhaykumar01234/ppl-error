import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import CheckboxView from './checkbox_view';
import { DEPLOYMENT_OPTIONS_LABEL_HELPER_TEXT } from '../config/constants';

const FilterDeploymentOptions = ({ deploymentOptions }) => {
  if (deploymentOptions.length === 0) return null;

  return (
    <div className="gdm-col">
      {deploymentOptions.map((deploymentOption) => (
        <div key={deploymentOption.id}>
          <CheckboxView
            label={deploymentOption.name}
            labelHelperText={DEPLOYMENT_OPTIONS_LABEL_HELPER_TEXT[deploymentOption.name]}
            isChecked={deploymentOption.status === 'active'}
            hideLabel
          />
        </div>
      ))}
    </div>
  );
};

FilterDeploymentOptions.defaultProps = {
  deploymentOptions: [],
};

FilterDeploymentOptions.propTypes = {
  deploymentOptions: PropTypes.arrayOf(PropTypes.object),
};

export default FilterDeploymentOptions;

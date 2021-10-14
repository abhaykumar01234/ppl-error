import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import CheckboxView from './checkbox_view';
import RadioButtonView from './radio_button_view';
import { FORM_CONTROL_LABEL_TEXT, RADIO_BUTTON_OPTIONS } from '../config/constants';
import '../bid_filters.scss';

const FilterFunctionalities = ({ functionalities }) => {
  if (functionalities.length === 0) return null;

  return (
    <>
      {functionalities.map(
        functionality =>
          Boolean(functionality.title) && (
            <div key={functionality.tooltip} className="gdm-col gdm-col-8">
              <CheckboxView
                label={functionality.title}
                tooltipText={functionality.tooltip}
                isChecked={functionality.mustBeSold}
                formControlLabelText={FORM_CONTROL_LABEL_TEXT}
              />
              <RadioButtonView options={RADIO_BUTTON_OPTIONS} functionality={functionality} />
              {functionality.features.length > 0 && (
                <>
                  <hr />
                  <div className="gdm-m-top-xs" moduleClassName="scrollable-checkbox-view">
                    <CheckboxView items={functionality.features} />
                  </div>
                </>
              )}
            </div>
          )
      )}
    </>
  );
};

FilterFunctionalities.defaultProps = {
  functionalities: [],
};

FilterFunctionalities.propTypes = {
  functionalities: PropTypes.arrayOf(PropTypes.object),
};

export default FilterFunctionalities;

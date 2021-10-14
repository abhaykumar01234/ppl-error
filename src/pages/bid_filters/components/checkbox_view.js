import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, ToolTip } from '@arubaito';

const noop = () => {};

const CheckboxView = ({ hideLabel, isChecked, label, labelHelperText, tooltipText, formControlLabelText, wrapperStyle, items }) => {
  const hasItems = items.length > 0;

  const getLabel = () => {
    if (tooltipText) {
      return (
        <div className="gdm-m-bottom-xs">
          <div id="bidFilterAnchor" className="gdm-m-top-xs" />
          <span className="gdm-label">{label}</span>
          <ToolTip
            targetId="bidFilterAnchor"
            placement="top"
            trigger={<span className="gdm-icon gdm-icon-info gdm-icon-sm gdm-m-top-sm gdm-m-left-xxs gdm-align-bottom" />}
          >
            {tooltipText}
          </ToolTip>
        </div>
      );
    }
    if (label) return <div className="gdm-label">{label}</div>;
    return null;
  };

  const getFormControlLabelText = () => {
    if (formControlLabelText) return formControlLabelText;
    if (label && labelHelperText) return `${label}: ${labelHelperText}`;
    return label;
  };

  const getItems = () => {
    return items.map(
      (item) =>
        Boolean(item.name) && (
          <div key={item.name}>
            <FormControlLabel
              data-cy="checkbox-label"
              label={item.name}
              control={<Checkbox name="sizes" onChange={noop} checked={item.isActive} className="gdm-z-index-deep" disabled value="" />}
              disabled
            />
          </div>
        )
    );
  };

  return (
    <>
      {!hideLabel && getLabel()}
      <div style={wrapperStyle}>
        {hasItems ? (
          getItems()
        ) : (
          <FormControlLabel
            key={getFormControlLabelText()}
            label={getFormControlLabelText()}
            control={<Checkbox name="sizes" onChange={noop} checked={isChecked} className="gdm-z-index-deep" disabled value="" />}
            disabled
          />
        )}
      </div>
    </>
  );
};

CheckboxView.defaultProps = {
  hideLabel: false,
  isChecked: false,
  label: '',
  labelHelperText: '',
  tooltipText: '',
  formControlLabelText: '',
  items: [],
};

CheckboxView.propTypes = {
  hideLabel: PropTypes.bool,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  labelHelperText: PropTypes.string,
  tooltipText: PropTypes.string,
  formControlLabelText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default CheckboxView;

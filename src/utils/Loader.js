import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { LoadingOverlay } from '@arubaito';
import s from './Loader.module.scss';

const Loader = ({ fullPage, ...props }) => (
  <div data-cy="loader" className={cx(s['loading-wrapper'], { [s['component-loader']]: !fullPage })}>
    <LoadingOverlay {...props} />
  </div>
);

Loader.propTypes = {
  fullPage: PropTypes.bool,
  light: PropTypes.bool,
};

Loader.defaultProps = {
  fullPage: true,
  light: true,
};

export default Loader;

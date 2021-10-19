import React from 'react';
import PropTypes from 'prop-types';
import s from './changed_bids_body.module.scss';

const ChangedBidsBody = ({ children }) => (
  <div className="gdm-w-18">
    <div className={s.scrollContents}>{children}</div>
  </div>
);

ChangedBidsBody.propTypes = {
  children: PropTypes.node
};

export default ChangedBidsBody;

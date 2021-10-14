import React from 'react';
import PropTypes from 'prop-types';
import './changed_bids_body.scss';

const ChangedBidsBody = ({ children }) => (
  <div className="gdm-w-18">
    <div moduleClassName="scrollContents">{children}</div>
  </div>
);

ChangedBidsBody.propTypes = {
  children: PropTypes.node
};

export default ChangedBidsBody;

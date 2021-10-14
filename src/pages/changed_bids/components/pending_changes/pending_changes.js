import React from 'react';
import PropTypes from 'prop-types';
import './pending_changes.scss';

export default function PendingChanges({ count }) {
  return (
    <div moduleClassName="pending-panel">
      <div moduleClassName="pending-number">{count}</div>
      <div moduleClassName="pending-text">
        {`Pending Change${count === 1 ? '' : 's'}`}
      </div>
    </div>
  );
}

PendingChanges.propTypes = {
  count: PropTypes.number,
};

PendingChanges.defaultProps = {
  count: 0,
};

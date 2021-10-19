import React from 'react';
import PropTypes from 'prop-types';
import s from './pending_changes.module.scss';

export default function PendingChanges({ count }) {
  return (
    <div className={s['pending-panel']}>
      <div className={s['pending-number']}>{count}</div>
      <div className={s['pending-text']}>{`Pending Change${count === 1 ? '' : 's'}`}</div>
    </div>
  );
}

PendingChanges.propTypes = {
  count: PropTypes.number
};

PendingChanges.defaultProps = {
  count: 0
};

import React from 'react';
import { Button } from '@capterra/arubaito';
import cx from 'classnames';
import s from '../bid_filters.module.scss';

const mailSubject = 'Update PPL Bid Filters';

const UpdateFiltersInfoBox = ({ representative }) => {
  return (
    <div className={s['update-filters-box']}>
      <div className="gdm-heading-lg">Update Filters</div>
      <div className="gdm-paragraph-sm">
        Contact your account manager, {representative.name} - {representative.email}, to edit your
        bidding filters. You cannot edit bid filters on this page.
      </div>
      <Button
        small
        variant="secondary"
        className={cx('gdm-w-24 gdm-m-top-xs', s['update-filters-btn'])}
        onClick={() =>
          window.open(`mailto:${representative.email}?subject=${mailSubject}`, '_blank')
        }
      >
        Email Account Manager
      </Button>
    </div>
  );
};

UpdateFiltersInfoBox.defaultProps = {
  representative: {}
};

export default UpdateFiltersInfoBox;

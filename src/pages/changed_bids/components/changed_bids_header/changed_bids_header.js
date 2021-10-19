import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PUSH_ALERT } from '@ppl/redux/reducers/alerts';
import saveBids from '@ppl/redux/actions/edit_bids/save_bids';
import CancelModal from '@ppl/pages/edit_bids/components/cancel_modal';
import { Button, LoadingOverlay } from '@arubaito';
import cx from 'classnames';
import s from './changed_bids_header.module.scss';

const ChangedBidsHeader = ({ children }) => {
  const [isSubmitting, setSubmit] = useState(false);
  const alertLength = useSelector(state => state.alerts.length);

  const dispatch = useDispatch();
  const { productId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf('confirm') > 0 || location.pathname.indexOf('error') > 0) {
      setSubmit(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    setSubmit(false);
  }, [alertLength]);

  const handleApplyBid = e => {
    e.stopPropagation();
    setSubmit(true);
    dispatch(saveBids(productId));
  };

  return (
    <div className={cx('gdm-grid', s['changed-bids-header'])} data-cy="drawer">
      <div className={cx('gdm-row', s['changed-bids-header-wrapper'])}>
        <div className="gdm-col gdm-col-12">{children}</div>
        <div className="gdm-col gdm-col-12">
          <div className={cx('gdm-grid', s['button-stack'])}>
            <div className="gdm-row">
              <div className="gdm-col gdm-col-24">
                <div className={s['overlay-wrapper']}>
                  {isSubmitting && <LoadingOverlay onClick={e => e.stopPropagation()} />}
                  <Button
                    data-cy="apply-bids"
                    data-gtm="pplbidding-editbid-applybidsbutton"
                    variant="primary"
                    onClick={handleApplyBid}
                  >
                    Apply Bids
                  </Button>
                </div>
              </div>
            </div>
            <div className="gdm-row">
              <div className="gdm-col gdm-col-24">
                <div
                  role="button"
                  data-gtm="pplbidding-editbid-cancelbidsbutton"
                  tabIndex="0"
                  className="gdm-link-light gdm-m-top-xs"
                  onKeyDown={() => {}}
                  onClick={() =>
                    dispatch({
                      type: PUSH_ALERT,
                      component: <CancelModal />
                    })
                  }
                >
                  Cancel bid changes and go back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChangedBidsHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default ChangedBidsHeader;

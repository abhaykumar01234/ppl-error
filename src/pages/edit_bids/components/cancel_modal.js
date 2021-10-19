import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SHIFT_ALERT } from '@ppl/redux/reducers/alerts';
import { CLEAR_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import { Button, Modal } from '@arubaito';
import s from './cancel_modal.module.scss';
import cx from 'classnames'

const CancelModal = () => {
  const dispatch = useDispatch();

  return (
    <Modal
      open
      closeOnBackdropClick={false}
      onClosed={() => dispatch({ type: SHIFT_ALERT })}
    >
      {close => (
        <div className={s["modal-wrapper"]} data-cy="cancel-edit-bid">
          <Modal.Header>
            <span className="gdm-icon gdm-icon-md gdm-icon-alert-error" />
            <span className={cx("gdm-heading-lg", s["heading-label"])}>Unsaved Bids</span>
            <Modal.Close onClick={close} />
          </Modal.Header>
          <Modal.Body>
            <p className="gdm-paragraph-sm">If you leave this page without applying your new bids, that data will be lost.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button data-gtm="pplbidding-unsavedmodal-returnbutton" className="gdm-m-left-sm gdm-m-top-sm" variant="primary" onClick={close}>
              Return to Bids
            </Button>
            <Link
              className="gdm-link-dark gdm-block gdm-m-top-sm"
              to="/vp/ppl/bids"
              data-gtm="pplbidding-unsavedmodal-cancelbutton"
              onClick={() => { dispatch({ type: CLEAR_CHANGED_BID }); close(); }}
            >
              Leave and abandon any changes
            </Link>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

export default CancelModal;

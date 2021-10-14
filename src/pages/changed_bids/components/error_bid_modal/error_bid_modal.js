import React from 'react';
import PropType from 'prop-types';
import { useDispatch } from 'react-redux';
import { CLEAR_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import { Button, Modal } from '@arubaito';
import './error_bid_modal.scss';

export default function ErrorBidModal({ onClosed }) {
  const dispatch = useDispatch();

  return (
    <Modal open onClosed={onClosed}>
      {close => (
        <div moduleClassName="modal-wrapper">
          <Modal.Header>
            <span className="gdm-icon gdm-icon-md gdm-icon-alert-error" />
            <span className="gdm-heading-lg" moduleClassName="heading-label">Unsaved Bids</span>
            <Modal.Close onClick={close} />
          </Modal.Header>
          <Modal.Body>
            <p className="gdm-paragraph-sm">
              We were unable to save your selected bids. Select Edit Bids below and re-enter your bid adjustments.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div moduleClassName="footer-wrapper">
              <Button className="gdm-m-top-sm" variant="primary" onClick={close}>
                Edit Bids
              </Button>
              <div
                role="button"
                tabIndex="0"
                className="gdm-link-dark gdm-m-top-sm"
                onKeyDown={() => { dispatch({ type: CLEAR_CHANGED_BID }); close(); }}
                onClick={() => { dispatch({ type: CLEAR_CHANGED_BID }); close(); }}
              >
                Cancel changes
              </div>
            </div>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
}

ErrorBidModal.propTypes = {
  onClosed: PropType.func,
};

ErrorBidModal.defaultProps = {
  onClosed: () => {},
};

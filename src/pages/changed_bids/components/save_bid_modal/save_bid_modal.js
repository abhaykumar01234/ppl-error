import React from 'react';
import PropType from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CLEAR_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import { Button, Modal } from '@arubaito';
import s from './save_bid_modal.module.scss';

export default function SaveBidModal({ onClosed }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleManageBids = () => {
    dispatch({ type: CLEAR_CHANGED_BID });
    history.push('/vp/ppl/bids');
    onClosed();
  };

  const cancelBtn = close => <Button data-gtm="pplbidding-savedmodal-returneditbutton" variant="secondary" onClick={close}> Return to Edit Bids </Button>;
  const continueBtn = <Button data-gtm="pplbidding-savedmodal-returnmanagebutton" variant="secondary" onClick={handleManageBids}> Return to Manage Bids </Button>;

  return (
    <Modal open onClosed={onClosed}>
      {close => (
        <div>
          <Modal.Header>
            <Modal.Close onClick={close} />
            <h2 className="gdm-heading-lg">Great! We&apos;ve saved your bids.</h2>
          </Modal.Header>
          <Modal.Body>
            <p className="gdm-paragraph-lg" />
          </Modal.Body>
          <Modal.Footer>
            <div className={s["footer-wrapper"]}>
              {continueBtn}
              {cancelBtn(close)}
            </div>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
}

SaveBidModal.propTypes = {
  onClosed: PropType.func,
};

SaveBidModal.defaultProps = {
  onClosed: () => {},
};

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SHIFT_ALERT } from '@ppl/redux/reducers/alerts';
import { Button, Modal } from '@arubaito';

const ContactAdvisorModal = ({ email }) => {
  const dispatch = useDispatch();
  return (
    <Modal open onClosed={() => dispatch({ type: SHIFT_ALERT })}>
      {close => (
        <div data-cy="advisor-modal">
          <Modal.Header>
            <span className="gdm-heading-lg">Contact Your Advisor</span>
            <Modal.Close onClick={close} />
          </Modal.Header>
          <Modal.Body>
            <a href={`mailto: ${email}`} className="gdm-paragraph-lg">
              {email}
            </a>
          </Modal.Body>
          <Modal.Footer>
            <Button
              data-cy="advisor-modal-ok-btn"
              className="gdm-m-left-sm gdm-m-top-sm"
              variant="primary"
              onClick={close}
            >
              OK
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};

ContactAdvisorModal.propTypes = {
  email: PropTypes.string
};

ContactAdvisorModal.defaultProps = {
  email: ''
};
export default ContactAdvisorModal;

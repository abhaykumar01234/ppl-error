import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PUSH_ALERT } from '@ppl/redux/reducers/alerts';
import ContactAdvisorModal from './contact_advisor_modal';
import './auction_bids_placeholder.scss';

const AuctionBidsPlaceholder = () => {
  const { representative } = useSelector(state => state.vendor);
  const dispatch = useDispatch();
  const email = representative ? representative.email : '';

  const contactLink = (
    <span
      role="button"
      tabIndex="0"
      onKeyUp={() => {}}
      className="gdm-link-default"
      moduleClassName="contact-link"
      data-cy="contact-link"
      onClick={() => (
        dispatch({
          type: PUSH_ALERT,
          component: <ContactAdvisorModal email={email} />,
        })
      )}
    >
      Get in touch
    </span>
  );
  return (
    <div moduleClassName="auction-bids-placeholder-wrapper">
      <span className="gdm-icon gdm-icon-xxl gdm-icon-target" />
      <p className="gdm-block gdm-paragraph-lg gdm-text-center">
        {
          'Need help? Use this tool to find and set optimal bids. \
          Select any bid to view the estimated position and cost per lead at that bid amount. '
        }
        { email && (
        <>
          Questions?&nbsp;
          {contactLink}
        </>
        ) }
      </p>
    </div>
  );
};

export default AuctionBidsPlaceholder;

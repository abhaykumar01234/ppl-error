import React from 'react';
import PropTypes from 'prop-types';
import s from './payment_details.module.scss';
import cx from 'classnames'

const PaymentDetails = ({ vendorName, paymentInfo }) => {
  const { contact, vendorId, creationDay, name } = paymentInfo || {};

  return (
    <section className="gdm-flex">
      <address className={cx("gdm-paragraph-sm", s.details)}>
        <p>Software Advice</p>
        <p>P.O. Box 733143</p>
        <p>Dallas, TX 75373-3143</p>
      </address>
      <div className={cx("gdm-paragraph-sm", s.details)}>
        <p>Received From: {vendorName || ''}</p>
        <p>Business Contact: {contact ? contact.fullName : ''}</p>
        <p>Customer #: {vendorId || ''}</p>
        <p>Date: {creationDay || ''}</p>
        <p>Payment Method: {name ? name.split('Payment - ')[1] : ''}</p>
        <div className="gdm-notification-lg gdm-m-top-sm">Payment for lead generation services</div>
      </div>
    </section>
  );
};

PaymentDetails.propTypes = {
  vendorName: PropTypes.string.isRequired,
  paymentInfo: PropTypes.shape({
    vendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    creationDay: PropTypes.string,
    name: PropTypes.string,
    contact: PropTypes.shape({
      fullName: PropTypes.string,
    }),
  }).isRequired,
};

export default PaymentDetails;

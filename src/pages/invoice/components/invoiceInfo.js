import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { VpComponents } from '@vp-components';
import './invoiceInfo.scss';

const InvoiceInfo = ({ invoice }) => {
  const { vendor } = useSelector((state) => state);

  if (Object.keys(vendor).length === 0) return null;

  const returnSoftwareAdviceAddress = () => (
    <div className="gdm-col gdm-col-5 gdm-m-top-md">
      <p>Software Advice</p>
      <p>P.O. Box 733143</p>
      <p>Dallas, TX 75373-3143</p>
    </div>
  );

  const returnBillingAddress = () => (
    <div className="gdm-col gdm-col-5 gdm-m-top-md">
      <p>Bill to:</p>
      <p>{vendor.name || ''}</p>
      {invoice.contact && invoice.contact.fullName && <p>{invoice.contact.fullName}</p>}
      <p>{vendor.address1 || ''}</p>
      {Boolean(vendor.address2) && <p>{vendor.address2}</p>}
      <p>{`${vendor.city || ''}, ${vendor.state || ''} ${vendor.zip || ''}`}</p>
      <p>{vendor.country || ''}</p>
    </div>
  );

  const returnDates = () => {
    return (
      <div className="gdm-col gdm-col-5 gdm-m-top-md">
        <p>Date: {invoice.creationDay || ''}</p>
        <p>Due Date: {invoice.dueDate || ''}</p>
        <p>Invoice #: {invoice.quickbooksId || ''}</p>
        <p>Invoice ID: {invoice.billId}</p>
        <p>Customer #: {invoice.vendorId}</p>
        <p>PO #: {invoice.purchaseOrder || ''}</p>
      </div>
    );
  };

  const returnBillingSummary = () => {
    const taxableAmount = invoice.subtotal * invoice.taxableRate;
    const taxAmount = taxableAmount * invoice.taxRate;
    const currentCharges = VpComponents.formatCurrency(taxAmount + invoice.subtotal);
    const invoiceDate = new Date(invoice.invoiceYear, invoice.invoiceMonth - 1, 1);
    const invoiceMonthName = invoiceDate.toLocaleString('default', {
      month: 'long',
    });

    return (
      <div className="gdm-col gdm-col-8 gdm-col-offset-1" moduleClassName="invoice-details-payment">
        <div className="gdm-row gdm-m-bottom-xs">
          <span className="gdm-col gdm-col-14">Subtotal:</span>
          <span className="gdm-col-8 gdm-col-offset-2">{VpComponents.formatCurrency(invoice.subtotal)}</span>
        </div>
        <div className="gdm-row gdm-m-bottom-xs">
          <span className="gdm-col gdm-col-14">{`Taxable Amount (${invoice.taxableRate}%):`}</span>
          <span className="gdm-col-8 gdm-col-offset-2">{VpComponents.formatCurrency(taxableAmount, null, 'N/A')}</span>
        </div>
        <div className="gdm-row gdm-m-bottom-xs">
          <span className="gdm-col gdm-col-14">{`Tax Amount (${invoice.taxRate}%):`}</span>
          <span className="gdm-col-8 gdm-col-offset-2">{VpComponents.formatCurrency(taxAmount, null, 'N/A')}</span>
        </div>
        {/*
          TODO:: remove this comment when this ticket gets fixed - https://softwareadvice.atlassian.net/browse/BUGS-4228
          <div className="gdm-row gdm-m-bottom-xs">
            <span className="gdm-col gdm-col-14">Balance Forward:</span>
            <span className="gdm-col-8 gdm-col-offset-2">{VpComponents.formatCurrency(invoice.balanceForward)}</span>
          </div> 
        */}
        <div className="gdm-row gdm-m-bottom-xs" moduleClassName="align-baseline">
          <span className="gdm-heading-lg gdm-col gdm-col-14">{invoiceMonthName} Charges:</span>
          <span className="gdm-col-8 gdm-col-offset-2">{currentCharges}</span>
        </div>
        <span className="gdm-notification-lg">All Amounts are in US dollars.</span>
      </div>
    );
  };

  return (
    <div moduleClassName="invoice-details-wrapper">
      <div className="gdm-paragraph-sm gdm-m-top-xl gdm-row" moduleClassName="invoice-details">
        {returnSoftwareAdviceAddress()}
        {returnBillingAddress()}
        {returnDates()}
        {returnBillingSummary()}
      </div>
    </div>
  );
};

InvoiceInfo.propTypes = {
  invoice: PropTypes.shape({
    amount: PropTypes.number,
    balanceForward: PropTypes.number,
    billId: PropTypes.number,
    quickbooksId: PropTypes.string,
    dueDate: PropTypes.string,
    contact: PropTypes.shape({ fullName: PropTypes.string }),
    revisionDay: PropTypes.string,
    creationDay: PropTypes.string,
    invoiceMonth: PropTypes.number,
    invoiceYear: PropTypes.number,
    isPartial: PropTypes.number,
    isRevised: PropTypes.number,
    name: PropTypes.string,
    purchaseOrder: PropTypes.string,
    subtotal: PropTypes.number,
    vendorId: PropTypes.number,
    taxRate: PropTypes.number,
    taxableRate: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
};

export default InvoiceInfo;

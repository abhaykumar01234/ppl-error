import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const InvoiceRow = ({ invoice }) => (
  <tr>
    <td className="gdm-text-left gdm-w-3">{invoice.billDate}</td>
    <td className="gdm-text-left gdm-w-7">
      <Link className="gdm-link-default" to={`/vp/ppl/billing-history/${invoice.type.toLowerCase()}/${invoice.billId}`}>
        {invoice.name}
      </Link>
    </td>
    <td className="gdm-text-right gdm-w-5">{invoice.invoices}</td>
    <td className="gdm-text-right gdm-w-5">{invoice.paymentsAndCredits}</td>
    <td className="gdm-text-right gdm-w-4">{invoice.balance}</td>
  </tr>
);

InvoiceRow.propTypes = {
  invoice: PropTypes.shape({
    billDate: PropTypes.string,
    billId: PropTypes.number,
    invoiceMonth: PropTypes.number,
    invoiceYear: PropTypes.number,
    invoices: PropTypes.string,
    paymentsAndCredits: PropTypes.string,
    balance: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
};
InvoiceRow.defaultProps = {
  invoice: {
    billDate: '',
    billId: 0,
    invoiceMonth: 0,
    invoiceYear: 0,
    invoices: '-',
    paymentsAndCredits: '-',
    balance: '-',
    name: '',
    type: '',
  },
};

export default InvoiceRow;

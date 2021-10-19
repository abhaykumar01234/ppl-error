import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './invoice_table.module.scss';

const InvoiceTable = ({ showScrollable, children }) => (
  <table className="gdm-table gdm-table-reset gdm-table-alternating gdm-text-center gdm-w-24">
    <thead className="gdm-block">
      <tr>
        <th className="gdm-w-3 gdm-text-left">Date</th>
        <th className="gdm-w-7 gdm-text-left">Activity</th>
        <th className="gdm-w-5 gdm-text-right">Invoice</th>
        <th className="gdm-w-5 gdm-text-right">Payments & Credits</th>
        <th className="gdm-w-4 gdm-text-right">Balance</th>
      </tr>
    </thead>
    <tbody
      className={cx(
        'gdm-relative ',
        { 'gdm-block gdm-scroll-shadow': showScrollable },
        s['table-content']
      )}
    >
      {children}
    </tbody>
  </table>
);

InvoiceTable.propTypes = {
  children: PropTypes.node,
  showScrollable: PropTypes.bool
};
InvoiceTable.defaultProps = {
  children: <tr />,
  showScrollable: false
};

export default InvoiceTable;

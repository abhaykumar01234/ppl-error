import React from 'react';
import PropTypes from 'prop-types';
import TableLoader from '@ppl/utils/TableLoader';
import InvoiceTable from './invoice_table';
import InvoiceRow from './invoice_row';

const NO_DATA_ERR_MSG = 'There is no data available based on your selection';

const InvoiceList = ({ status, invoiceList }) => {
  const isEmptyInvoiceList = invoiceList && invoiceList.length === 0;
  const isError = status.isError || isEmptyInvoiceList;
  const isPending = status.isLoading;

  return (
    <div className="gdm-m-top-lg">
      <InvoiceTable showScrollable={!isEmptyInvoiceList}>
        {!status.isSuccess || isEmptyInvoiceList ? (
          <TableLoader
            isError={!isPending && isError}
            colSpan={5}
            errorMessage={!status.isError && isEmptyInvoiceList && NO_DATA_ERR_MSG}
          />
        ) : (
          invoiceList.map((invoice) => <InvoiceRow key={invoice.billId} invoice={invoice} />)
        )}
      </InvoiceTable>
    </div>
  );
};

InvoiceList.propTypes = {
  status: PropTypes.shape({
    isLoading: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isError: PropTypes.bool,
  }),
  invoiceList: PropTypes.arrayOf(
    PropTypes.shape({
      billDate: PropTypes.string,
      billId: PropTypes.number,
      invoiceMonth: PropTypes.number,
      invoiceYear: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

InvoiceList.defaultProps = {
  status: { loading: false, success: false, error: false },
  invoiceList: [
    {
      billDate: '',
      billId: 0,
      invoiceMonth: 0,
      invoiceYear: 0,
      name: '',
    },
  ],
};

export default InvoiceList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncFetch from '@ppl/custom_hooks/use_async_fetch';
import withLoader from '@ppl/utils/with_loader';
import ExportButtons from '@ppl/shared_components/export_buttons';
import fetchVendor from '@ppl/redux/actions/fetch_vendor';
import { VpComponents } from '@vp-components';
import { prefixDate } from '@ppl/utils/date';
import InvoiceList from '../components/invoice_list';
import BillingView from '../components/invoices_pdf_view';
import csvInvoiceHeaders from '../csv_invoice_headers.json';

const formatAmounts = (invoices = []) =>
  invoices.map((invoice) => ({
    ...invoice,
    balance: VpComponents.formatCurrency(invoice.balance),
    invoices: invoice.invoices ? `${VpComponents.formatCurrency(invoice.invoices)} CC` : '-',
    paymentsAndCredits: VpComponents.formatCurrency(invoice.paymentsAndCredits),
  }));

const BillingHistory = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const { vendor } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { data, status } = useAsyncFetch('/invoices');

  useEffect(() => {
    dispatch(fetchVendor());
  }, []);

  useEffect(() => {
    if (status.isSuccess) {
      const invoices = data || [];
      setInvoiceList(formatAmounts(invoices));
    }
  }, [status.isSuccess, data]);

  const csvButton = (
    <ExportButtons.CSV
      fileName={prefixDate('invoice_list.csv')}
      headers={csvInvoiceHeaders}
      data={invoiceList}
      disabled={!status.isSuccess}
      data-cy="billingHistory-csv-export"
    >
      Download CSV
    </ExportButtons.CSV>
  );

  const pdfButton = (
    <ExportButtons.PDF
      documentView={<BillingView vendor={vendor} invoiceList={invoiceList} />}
      fileName={prefixDate('invoice_list.pdf')}
      disabled={!status.isSuccess}
      data-cy="billingHistory-pdf-export"
    >
      Download PDF
    </ExportButtons.PDF>
  );
  return (
    <div>
      <p className="gdm-title">PPL Billing History</p>
      <InvoiceList status={status} invoiceList={invoiceList} />
      {status.isSuccess && (
        <ExportButtons>
          {csvButton}
          {pdfButton}
        </ExportButtons>
      )}
    </div>
  );
};

export default withLoader(BillingHistory);

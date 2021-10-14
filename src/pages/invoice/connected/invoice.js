import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import withLoader from '@ppl/utils/with_loader';
import { AlertMessage, Button, FlashMessage, LoadingOverlay } from '@capterra/arubaito';
import fetchVendor from '@ppl/redux/actions/fetch_vendor';
import authFetch from '@ppl/redux/actions/auth_fetch';
import { VpComponents } from '@vp-components';
import LeadsTable from '../components/leadsTable';
import InvoiceInfo from '../components/invoiceInfo';

const Invoice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const isPartial = Boolean(invoice.isPartial);

  useEffect(() => {
    setErrorMessage(null);
    const fetchInvoiceData = async () => {
      try {
        const promiseList = [
          authFetch(`/invoices/${id}/payment`).then((response) => {
            if (!response.ok) {
              if (response.status === 404) {
                VpComponents.windowFlashAdd(`The Invoice with id:${id} does not exist.`, 'error');
                history.push('/vp/ppl/billing-history');
              }
            }
            return response.json();
          }),
          dispatch(fetchVendor()),
        ];

        const [paymentResponse] = await Promise.all(promiseList);

        setInvoice(paymentResponse);
        return null;
      } catch (e) {
        setIsLoading(false);
        VpComponents.windowFlashAdd(e.message, 'error');
        throw new Error(e.message);
      }
    };
    fetchInvoiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (Object.keys(invoice).length === 0) return;

    setErrorMessage(null);
    const fetchLeadsData = async () => {
      try {
        const queryParams = {
          month: invoice.invoiceMonth,
          year: invoice.invoiceYear,
        };
        const leadsData = await authFetch(`/leads/billing_report_by_month?${VpComponents.toQueryString(queryParams)}`).then((response) => {
          setIsLoading(false);
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        });

        setLeads(leadsData || {});
        return null;
      } catch (e) {
        setIsLoading(false);
        VpComponents.windowFlashAdd(e.message, 'error');
        throw new Error(e.message);
      }
    };
    fetchLeadsData();
  }, [invoice]);

  const downloadInvoicePDF = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch(`/invoices/${id}`)
      if (!response.ok) throw new Error(response.statusText);
      const { url } = await response.json();
      if (!url) throw new Error('Invalid URL');
      window.open(url);
    } catch(e) {
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingOverlay light />;

  return (
    <div className="gdm-grid gdm-p-none">
      {isPartial && (
        <FlashMessage status="notification">
          This is not your final bill. This page does not reflect any potential refunds. Please wait until after the 8th of the month to access and
          pay your bill.
        </FlashMessage>
      )}
      <div className="gdm-m-top-md gdm-col-6">
        <h1 className="gdm-title gdm-m-bottom-none">PPL Billing History</h1>
        <Link className="gdm-link-default default-bid-link gdm-block gdm-m-top-xs" to="/vp/ppl/billing-history">
          Go Back to PPL Billing History
        </Link>
        <h3 className="gdm-heading-lg gdm-m-top-sm">{invoice.name}</h3>
      </div>
      <InvoiceInfo invoice={invoice} />
      <LeadsTable leads={leads} isLoading={isLoading} />
      <div className="gdm-grid">
        <div className="gdm-row">
          <div className="gdm-col gdm-col-12">
            <span className="gdm-paragraph-sm">
              Questions regarding this invoice can be directed to the Software Advice Finance Team.
              <br />
              <a className="gdm-link-default" href="mailto:SoftwareAdviceFinance@gartner.com">
                SoftwareAdviceFinance@gartner.com
              </a>
            </span>
          </div>
          <div className="gdm-col gdm-col-12 gdm-text-right">
            <Button variant="secondary" onClick={downloadInvoicePDF}>
              Download PDF
            </Button>
          </div>
        </div>
        {errorMessage && (
          <div className="gdm-row gdm-m-top-xs">
            <div className="gdm-col gdm-col-24 gdm-text-right">
              <AlertMessage status="error">{errorMessage}</AlertMessage>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withLoader(Invoice);

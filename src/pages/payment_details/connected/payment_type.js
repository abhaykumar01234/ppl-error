import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import fetchPaymentInfo from '@ppl/redux/actions/payment_ach/fetch_payment_info';
import withLoader from '@ppl/utils/with_loader';
import { VpComponents } from '@vp-components';
import ExportButtons from '@ppl/shared_components/export_buttons';
import { prefixDate } from '@ppl/utils/date';
import PaymentView from '../components/payment_pdf_view';
import PaymentDetails from '../components/payment_details';
import s from './payment_type.module.scss';
import cx from 'classnames'

const PaymentType = () => {
  const { billId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [paymentInfo, setPaymentInfo] = useState({});
  const { name: vendorName = '' } = useSelector((state) => state.vendor);

  const isDetailAvailable = Object.keys(paymentInfo).length > 0;

  useEffect(() => {
    async function fetchInfo() {
      const payment = await dispatch(fetchPaymentInfo(billId));
      if (payment && payment.ok) {
        setPaymentInfo(payment.data);
      } else {
        if (payment && payment.status === 401) {
          VpComponents.windowFlashAdd(`You are not authorized to view the Invoice id:${billId}`, 'error');
        } else {
          VpComponents.windowFlashAdd(`The Invoice with id:${billId} does not exist.`, 'error');
        }
        history.push('/vp/ppl/billing-history');
      }
    }

    fetchInfo();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const pdfButton = (
    <ExportButtons.PDF
      documentView={<PaymentView vendorName={vendorName} paymentInfo={paymentInfo} />}
      fileName={prefixDate('payment_receipt.pdf')}
      data-cy="payment-pdf-export"
    >
      Download PDF
    </ExportButtons.PDF>
  );

  return (
    <div>
      <header className={s.header}>
        <h1 className={cx("gdm-title", s.title)}>
          PPL Billing History
        </h1>
        <Link to="/vp/ppl/billing-history" className="gdm-link-default" data-cy="invoices-link">
          Go back to PPL Billing History
        </Link>
      </header>
      <br />
      {isDetailAvailable && <h3 className="gdm-heading-lg">Receipt for Payment({paymentInfo.creationDay})</h3>}
      <div className={s.detailWrapper}>
        <PaymentDetails vendorName={vendorName} paymentInfo={paymentInfo} />
        {paymentInfo && paymentInfo.billId && vendorName && <ExportButtons>{pdfButton}</ExportButtons>}
      </div>
    </div>
  );
};

export default withLoader(PaymentType);

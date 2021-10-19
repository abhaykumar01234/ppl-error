/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CSVLink } from 'react-csv';
import { pdf } from '@react-pdf/renderer';
import { toDateString, getYesterday, getFirstDay } from '@ppl/utils/date';
import { blobToFile } from '@ppl/utils/download';
import fetchLeadsReport from '@ppl/redux/actions/fetch_leads_report';
import fetchLeads from '@ppl/redux/actions/fetch_leads';
import { AlertMessage, Button, InputField, DatePicker } from '@arubaito';
import setIsLoading from '@ppl/redux/actions/set_is_loading';
import LeadsDocument from './view_leads_pdf_report';
import s from './view_leads_header.module.scss';
import cx from 'classnames';

const today = new Date();

const toPdf = async (document, filename) => {
  blobToFile(await pdf(document).toBlob(), filename);
};

const datePresets = [
  {
    text: 'Today',
    start: today,
    end: today,
  },
  {
    text: 'Last month',
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  },
  {
    text: 'Last 7 Days',
    start: new Date().setDate(today.getDate() - 6),
    end: today,
  },
];

const headers = [
  { label: 'Company', key: 'company' },
  { label: 'Name', key: 'name' },
  { label: 'Job Title', key: 'jobTitle' },
  { label: 'Phone', key: 'phone' },
  { label: 'Email', key: 'email' },
  { label: 'Address', key: 'address' },
  { label: 'City', key: 'city' },
  { label: 'State', key: 'state' },
  { label: 'Zip', key: 'zip' },
  { label: 'Country', key: 'country' },
  { label: 'Industry', key: 'industry' },
  { label: 'Industry Segment', key: 'industrySegment' },
  { label: 'Size of Business', key: 'size1' },
  { label: 'Size of Business 2', key: 'size2' },
  { label: 'Size of Business 3', key: 'size3' },
  { label: 'Applications Needed', key: 'applicationsNeeded' },
  { label: 'Integration', key: 'integration' },
  { label: 'Deployment', key: 'deployment' },
  { label: 'Timeframe', key: 'timeframe' },
  { label: 'Sent Request', key: 'sentRequest' },
  { label: 'Total Lead Price', key: 'totalLeadPrice' },
  { label: 'CRM Integration Fee', key: 'crmIntegrationFee' },
  { label: 'Appointment Premium', key: 'appointmentPremium' },
  { label: 'Call Notes', key: 'callNotes' },
  { label: 'Product of Interest', key: 'productOfInterest' },
  { label: 'Date Made', key: 'dateMade' },
  { label: 'Date Sent', key: 'dateSent' },
  { label: 'Demo Time', key: 'demoTime' },
  { label: 'Qualified By', key: 'qualifiedBy' },
  { label: 'Lead Type', key: 'leadType' },
];

const Header = ({
  vendor, leadsReport, fetchingData, setFetchingData,
}) => {
  const [downloadCsv, setDownloadCsv] = useState(false);
  const [showExportErrorMsg, setShowExportErrorMsg] = useState(false);
  const [startDate, setStartDate] = useState(getFirstDay());
  const [leadFilterName, setLeadFilterName] = useState('');
  const [endDate, setEndDate] = useState(getYesterday());
  const [focusedInput, setFocusedInput] = useState();

  const csvRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (downloadCsv) {
      if (leadsReport.length) {
        csvRef.current.link.click();
      } else {
        setShowExportErrorMsg(true);
      }
      setDownloadCsv(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadCsv]);

  const leadFilter = e => setLeadFilterName(e.target.value);

  const getReportCsv = () => {
    dispatch(setIsLoading(true));
    setShowExportErrorMsg(false);
    dispatch(
      fetchLeadsReport(vendor.id, {
        startDate: toDateString(startDate),
        endDate: toDateString(endDate),
        leadName: leadFilterName.trim(),
      }),
    )
      .then(() => { setDownloadCsv(true); })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const getReportPdf = () => {
    dispatch(setIsLoading(true));
    setShowExportErrorMsg(false);
    setFetchingData({ status: 'pending' });
    dispatch(
      fetchLeads(vendor.id, {
        startDate: toDateString(startDate),
        endDate: toDateString(endDate),
        leadName: leadFilterName.trim(),
      }),
    )
      .then((leads) => {
        const exportPdf = (leads && leads.length > 1)
          ? toPdf(
            <LeadsDocument leads={leads} />,
            `${vendor.name}-${toDateString(startDate)}-${toDateString(endDate)}-leads-report.pdf`,
          )
          : setShowExportErrorMsg(true);
        setFetchingData({ status: 'success' });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const getReport = () => {
    setFetchingData({ status: 'pending' });
    setShowExportErrorMsg(false);
    dispatch(
      fetchLeads(vendor.id, {
        startDate: toDateString(startDate),
        endDate: toDateString(endDate),
        leadName: leadFilterName.trim(),
      }),
    )
      .then(() => { setFetchingData({ status: 'success' }); })
      .catch(() => { setFetchingData({ status: 'error' }); });
  };

  // eslint-disable-next-line no-shadow
  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // eslint-disable-next-line no-shadow
  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  return (
    <div className={cx("gdm-grid gdm-m-bottom-md", s["view-leads-header"])}>
      <span className="gdm-title">View Leads</span>
      <div className="gdm-row gdm-m-top-md">
        <InputField
          className="gdm-col gdm-col-10"
          render={id => (
            <>
              <InputField.Label htmlFor={id}>
                Date Range
              </InputField.Label>
              <DatePicker
                minDate={new Date(new Date().setDate(today.getDate() - 180))}
                maxDate={today}
                startDate={startDate}
                endDate={endDate}
                onDatesChange={onDatesChange}
                focusedInput={focusedInput}
                onFocusChange={onFocusChange}
                datePresets={datePresets}
              />
            </>
          )}
        />
        <InputField
          className="gdm-col gdm-col-8"
          render={(id, status) => (
            <>
              <InputField.Label htmlFor={id}>
                Search Lead Name
              </InputField.Label>
              <InputField.Input
                id={id}
                value={leadFilterName}
                name="searchLead"
                placeholder="Lead Name"
                className="gdm-m-bottom-none"
                onChange={leadFilter}
              />
            </>
          )}
        />
        <div className={cx("gdm-col gdm-col-6", s["get-report-button-wrapper"])}>
          <Button
            className="gdm-w-24"
            variant="primary"
            data-gtm="pplleads-viewleads-getreportbutton"
            disabled={fetchingData.status === 'pending'}
            onClick={getReport}
          >
            Get Report
          </Button>
        </div>
      </div>
      <div className="gdm-row gdm-m-top-md">
        <div className="gdm-col gdm-col-18">
          {showExportErrorMsg && (
            <AlertMessage status="error">
              CSV/PDF can't be exported as there are no leads for the selected date range.
            </AlertMessage>
          )}
        </div>
        <div className="gdm-col gdm-col-3">
          <>
            <CSVLink
              ref={csvRef}
              headers={headers}
              data={leadsReport}
              filename={`${vendor.name}-${toDateString(startDate)}-${toDateString(endDate)}-leads-report.csv`}
            />
            <Button
              className={s["export-buttons"]}
              variant="secondary"
              small
              data-gtm="pplleads-viewleads-exportcsv"
              disabled={(fetchingData.status === 'pending') || !startDate || !endDate}
              onClick={getReportCsv}
            >
              Export CSV
            </Button>
          </>
        </div>
        <div className="gdm-col gdm-col-3">
          <Button
            className={s["export-buttons"]}
            variant="secondary"
            small
            data-gtm="pplleads-viewleads-exportpdf"
            disabled={(fetchingData.status === 'pending') || !startDate || !endDate}
            onClick={getReportPdf}
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  vendor: PropTypes.shape({}).isRequired,
  leadsReport: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchingData: PropTypes.shape({ status: PropTypes.string }).isRequired,
  setFetchingData: PropTypes.func.isRequired,
};

export default Header;

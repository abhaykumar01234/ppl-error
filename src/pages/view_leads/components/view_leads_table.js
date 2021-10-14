import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VpComponents } from '@vp-components';
import { formatDate } from '@ppl/utils/date';
import TableLoader from '@ppl/utils/TableLoader';
import './view_leads_table.scss';

const FALLBACK = '-';
const NO_LEADS_FOUND = 'There are no leads for the selected search criteria.';

const Table = ({ fetchingData, leads }) => {
  const [tableError, setTableError] = useState(null);

  useEffect(() => {
    if (!leads || !leads.length) {
      setTableError(fetchingData.status === 'success' ? NO_LEADS_FOUND : null);
    } else {
      setTableError(null);
    }
  }, [leads, fetchingData.status]);

  const returnTableRow = () =>
    leads.map((lead) => {
      const { leadId, dateSent, company, size, amount, product } = lead;
      return (
        <tr key={leadId}>
          <td className="gdm-w-3">{formatDate(dateSent) || FALLBACK}</td>
          <td className="gdm-w-6">
            <Link className="gdm-link-default" data-gtm="pplbidding-leads-viewleaddetails" to={`/vp/ppl/leads/${String(leadId)}`}>
              {company || FALLBACK}
            </Link>
          </td>
          <td className="gdm-w-7">{product || FALLBACK}</td>
          <td className="gdm-w-5">{size || FALLBACK}</td>
          <td className="gdm-w-3">{VpComponents.formatCurrency(amount)}</td>
        </tr>
      );
    });

  const showLoader = fetchingData.status !== 'success' || tableError;
  return (
    <table className="gdm-table gdm-table-reset gdm-w-24 gdm-table-alternating gdm-text-left">
      <thead>
        <tr>
          <th className="gdm-w-3">Date</th>
          <th className="gdm-w-6">Lead</th>
          <th className="gdm-w-7">Recommended Product</th>
          <th className="gdm-w-5">Size</th>
          <th className="gdm-w-3">Price</th>
        </tr>
      </thead>
      <tbody>
        {showLoader ? (
          <TableLoader colSpan={5} isError={fetchingData.status === 'error' || tableError} errorMessage={tableError} />
        ) : (
          leads && returnTableRow()
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  fetchingData: PropTypes.shape({ status: PropTypes.string }).isRequired,
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '@ppl/utils/date';
import TableLoader from '@ppl/utils/TableLoader';
import s from './leadsTable.module.scss';

const LeadsTable = ({ leads, isLoading }) => (
  <div className={s["leads-table-wrapper"]}>
    <table className="gdm-table gdm-table-alternating gdm-table-inputs gdm-table-reset gdm-text-center gdm-w-24">
      <thead>
        <tr>
          <th className="gdm-w-2 gdm-text-left">Date</th>
          <th className="gdm-w-8 gdm-text-left">Lead</th>
          <th className="gdm-w-8 gdm-text-left">Recommended Product</th>
          <th className="gdm-w-4 gdm-text-left">Size</th>
          <th className="gdm-w-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {leads.length ? (
          leads.map((lead) => (
            <tr key={lead.leadId} className={s["leads-table-row"]}>
              <td className="gdm-w-2 gdm-text-left">{formatDate(lead.dateSent)}</td>
              <td className="gdm-w-8 gdm-text-left" title={lead.company}>
                <Link className="gdm-link-default" to={`/vp/ppl/leads/${lead.leadId}`}>
                  {lead.company}
                </Link>
              </td>
              <td className="gdm-w-8 gdm-text-left" title={lead.systemName}>
                {lead.systemName}
              </td>
              <td className="gdm-w-4 gdm-text-left">{lead.size}</td>
              <td className="gdm-w-2">{lead.amount}</td>
            </tr>
          ))
        ) : (
          <TableLoader colSpan={12} isError={!isLoading} errorMessage="You don't have any leads for this invoice." />
        )}
      </tbody>
    </table>
  </div>
);

LeadsTable.defaultProps = {
  leads: [],
};

LeadsTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  leads: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      appointmentDate: PropTypes.string,
      company: PropTypes.string,
      crmPremiumAmount: PropTypes.number,
      dateSent: PropTypes.string,
      leadId: PropTypes.number,
      size: PropTypes.string,
      status: PropTypes.string,
      systemName: PropTypes.string,
    })
  ),
};

export default LeadsTable;

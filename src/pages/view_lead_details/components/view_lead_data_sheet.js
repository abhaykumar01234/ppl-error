import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToolTip } from '@arubaito';
import leadDetailsHash from '../config/lead_detail_fields';
import s from './view_lead_data_sheet.module.scss';
import cx from 'classnames';

const FALLBACK = '-';

const DataSheet = ({ lead }) => (
  <div className={cx("gdm-grid", s["lead-content-align"])}>
    <h1 className="gdm-title">Lead Details</h1>
    <Link
      className="gdm-link-default"
      data-gtm="pplleads-leaddetail-viewallleads"
      to="/vp/ppl/leads"
    >
      Go Back to View All Leads
    </Link>
    {leadDetailsHash.map(({ heading, leadData }) => (
      <div key={heading} className="gdm-row gdm-m-top-lg gdm-block">
        <div className="gdm-col">
          <span className="gdm-heading-lg">{heading}</span>
        </div>
        <div className="gdm-flex">
          {leadData.map((colData, idx) => (
            <div key={idx} className="gdm-col gdm-col-8 gdm-m-right-xl">
              {colData.map(({
                title, key, toolTip, toolTipKey, nested, getNestedValue,
              }) => (
                <div key={title}>
                  {toolTip ? (
                    <div>
                      <div id="leadDetailsTitle" className="gdm-m-top-xs" />
                      <span className="gdm-heading-sm">{title}</span>
                      <ToolTip
                        targetId="leadDetailsTitle"
                        placement="top"
                        trigger={<span className={cx("gdm-icon gdm-icon-info gdm-m-top-sm gdm-m-left-xxs", s["icon-custom-size"])} />}
                      >
                        {lead[toolTipKey]}
                      </ToolTip>
                    </div>
                  ) : <span className="gdm-heading-sm gdm-block">{title}</span>}
                  {nested ? <span className="gdm-paragraph-sm">{getNestedValue(lead) || FALLBACK}</span>
                    : <span className="gdm-paragraph-sm">{lead[key] || FALLBACK}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

DataSheet.propTypes = {
  lead: PropTypes.shape({}).isRequired,
};

export default DataSheet;

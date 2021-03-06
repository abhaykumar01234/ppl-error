import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './overall_campaign_summary.module.scss';

const FALLBACK = '-';

const OverallCampaignSummary = ({
  metrics: { leadsWon, recommendationOpportunities, recommendationRate }
}) => (
  <div className={cx('gdm-grid', s['overall-campaign-summary'])}>
    <div className="gdm-row gdm-flex">
      <div className="gdm-text-left gdm-col gdm-col-10 gdm-m-top-lg">
        <span className="gdm-label">Overall Campaign Summary</span>
      </div>
      <div className="gdm-col gdm-col-6 gdm-m-top-lg">
        <span className="gdm-label">
          Recommendation Opportunities: {recommendationOpportunities || FALLBACK}
        </span>
      </div>
      <div className="gdm-col gdm-col-3 gdm-m-top-lg">
        <span className="gdm-label">Leads Won: {leadsWon || FALLBACK}</span>
      </div>
      <div className="gdm-col gdm-col-5 gdm-m-top-lg">
        <span className="gdm-label">
          Recommendation Rate: {(recommendationRate && recommendationRate.toFixed(2)) || FALLBACK}
          {recommendationRate && '%'}
        </span>
      </div>
    </div>
  </div>
);

OverallCampaignSummary.defaultProps = {
  metrics: {
    leadsWon: '',
    recommendationOpportunities: '',
    recommendationRate: null
  }
};

OverallCampaignSummary.propTypes = {
  metrics: PropTypes.shape({
    leadsWon: PropTypes.string,
    recommendationOpportunities: PropTypes.string,
    recommendationRate: PropTypes.number
  })
};

export default OverallCampaignSummary;

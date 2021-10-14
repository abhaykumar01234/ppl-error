import React from 'react';
import { Footnote } from '@arubaito';

const Footer = () => (
  <div data-cy="footer" className="gdm-flex">
    <Footnote className="gdm-w-8 gdm-align-top">
      <Footnote.Icon className="gdm-icon-footnote-dollar" />
      <Footnote.Header>How Bidding Works</Footnote.Header>
      <Footnote.Body>
        Bids can be increased in increments of $5.00 (US) starting at the base cost per lead amount.
        You may bid the same amount as an existing bid.
        However, to outbid or pass an existing bid, you must bid an amount at least $5.00 (US) more than the existing bid.
      </Footnote.Body>
    </Footnote>
    <Footnote className="gdm-w-8 gdm-align-top">
      <Footnote.Icon className="gdm-icon-footnote-equals" />
      <Footnote.Header>Bidding Platform</Footnote.Header>
      <Footnote.Body>
        If multiple vendors bid the same amount,
        the maximum bid cost will apply to all tied vendors included on the lead
        and rank will be determined by the order in which bids were submitted,
        i.e. the first bid submitted at that amount will receive the first position.
      </Footnote.Body>
    </Footnote>
    <Footnote className="gdm-w-8 gdm-align-top">
      <Footnote.Icon className="gdm-icon-footnote-estimate" />
      <Footnote.Header>Recommendation Rate</Footnote.Header>
      <Footnote.Body>
        This is the percentage of leads matching all your filters that you
        have received with your current bidding strategy within the past 7 days.
      </Footnote.Body>
    </Footnote>
  </div>
);

export default Footer;

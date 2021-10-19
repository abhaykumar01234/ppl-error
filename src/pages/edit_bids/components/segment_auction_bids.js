import React from 'react';
import PropTypes from 'prop-types';
import { VpComponents } from '@vp-components';
import s from './segment_auction_bids.module.scss';

const SegmentAuctionBids = ({ selectedBid }) => (
  <div className={s["segment-auction-bids-wrapper"]}>
    <div className="gdm-heading-lg">{selectedBid.sizeBid.label}</div>
    <div className="gdm-heading-lg">{selectedBid.bid.label}</div>
    <p className="gdm-paragraph-lg gdm-text-center gdm-m-top-sm">
      Max Market Bid: &nbsp;
      {VpComponents.formatCurrency(selectedBid.bid.highestBid)}
    </p>
    <p className="gdm-paragraph-lg gdm-text-center">
      Current Position: &nbsp;
      {selectedBid.bid.currentPosition || '-'}
    </p>
  </div>
);

SegmentAuctionBids.propTypes = {
  selectedBid: PropTypes.shape({
    bid: PropTypes.shape({
      label: PropTypes.string,
      highestBid: PropTypes.number,
      currentPosition: PropTypes.number,
    }),
    sizeBid: PropTypes.shape({
      label: PropTypes.string,
    }),
  }),
};

export default SegmentAuctionBids;

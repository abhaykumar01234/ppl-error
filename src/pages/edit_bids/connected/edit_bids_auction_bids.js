/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setChangedBid from '@ppl/redux/actions/edit_bids/set_changed_bid';
import getAuctionBidsData from '@ppl/selectors/get_auction_bids_data';
import { VpComponents } from '@vp-components';
import Loader from '@ppl/utils/Loader';
import { TableRowSelect } from '@arubaito';

import s from './edit_bids_auction_bids.module.scss';
import cx from 'classnames';

const returnAuctionBidsRow = (index, { bidPosition = '-', bidValue, bidTakePositionValue, isUserPosition }, selectedBid, dispatch) => (
  <TableRowSelect key={index}>
    <td className="gdm-w-6">
      <TableRowSelect.Button
        data-gtm="pplbidding-editbids-righttableselect"
        onClick={() => {
          dispatch(
            setChangedBid({
              key: selectedBid.changedBidKey,
              amount: typeof bidValue === 'string' ? parseFloat(bidValue.replace(/,/g, '')) : bidValue,
            })
          );
        }}
      >
        Select
      </TableRowSelect.Button>
      {bidPosition}
    </td>
    <td className="gdm-w-6">{VpComponents.formatCurrency(bidValue)}</td>
    <td className="gdm-w-6">{VpComponents.formatCurrency(bidTakePositionValue)}</td>
    <td className="gdm-w-6">{isUserPosition && <div className={s["icon-filled-circle"]} />}</td>
  </TableRowSelect>
);

const AuctionBids = () => {
  const { selectedBid, auctionBids } = useSelector((state) => getAuctionBidsData(state));
  const dispatch = useDispatch();

  const selectedAuctionBid = auctionBids[`${selectedBid.type}-${selectedBid.bid.id}`];

  return (
    <div className={s["auction-bids-wrapper"]}>
      {!selectedAuctionBid ? (
        <Loader fullPage={false} />
      ) : (
        <>
          <main>
            <header>
              <span className="gdm-block gdm-heading-lg">{selectedBid.bid.label}</span>
              <span className="gdm-block gdm-paragraph-sm">{selectedBid.sizeLabel || 'All Segments'}</span>
            </header>
            <table className={cx("gdm-table gdm-text-center gdm-m-top-md gdm-overflow-hidden", s["auction-bids-table"])}>
              <thead>
                <tr>
                  <th className="gdm-w-6">Position</th>
                  <th className="gdm-w-6">Bid</th>
                  <th className="gdm-w-6">
                    Max.
                    <br />
                    Market Bid
                  </th>
                  <th className="gdm-w-6">Current Position</th>
                </tr>
              </thead>
              <tbody data-cy="auction-bids-table">
                {selectedAuctionBid.bids.map((bid, index) => returnAuctionBidsRow(index, bid, selectedBid, dispatch))}
              </tbody>
            </table>
          </main>
          <footer>
            <span className={cx("gdm-block gdm-paragraph-sm", s["bid-accuracy-info"])}>
              This information is accurate as of {new Date(selectedAuctionBid.timestamp).toUTCString()}.
            </span>
          </footer>
        </>
      )}
    </div>
  );
};

export default AuctionBids;

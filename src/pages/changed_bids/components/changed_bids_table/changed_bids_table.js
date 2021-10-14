import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { DELETE_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import { VpComponents } from '@vp-components';
import './changed_bids_table.scss';

export default function ChangedBidsTable({ product, changedBids }) {
  const dispatch = useDispatch();
  const { name: productName } = product;

  return (
    <div>
      <table moduleClassName="contentTableOverview" data-cy="changed-bid-table">
        <colgroup>
          <col />
          <col span="2" />
          <col span="2" moduleClassName="current" />
        </colgroup>
        <thead>
          <tr>
            <th />
            <th />
            <th />
            <th />
            <th />
          </tr>
          <tr>
            <th />
            <th colSpan="2">
              <span>Old Values:</span>
            </th>
            <th colSpan="2" moduleClassName="strong">
              <span>New values:</span>
            </th>
          </tr>
          <tr>
            <th>
              Review Your
              {productName}
              Default Bid Changes
            </th>
            <th>Bid</th>
            <th>Max Cost</th>
            <th moduleClassName="strong">Bid</th>
            <th moduleClassName="strong">Max Cost</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(changedBids).map(([bidKey, bid]) => {
            if (bid.invalid) return undefined;

            return (
              <tr key={bidKey}>
                <th>
                  <button
                    type="button"
                    data-gtm="pplbidding-drawer-bidremoval"
                    moduleClassName="remove"
                    onClick={() => dispatch({ type: DELETE_CHANGED_BID, key: bidKey })}
                  >
                    Remove
                  </button>
                  <span className="gdm-icon gdm-icon-close gdm-icon-sm" moduleClassName="icon-t" />
                  {bid.label}
                </th>
                <td>{bid.oldValues && VpComponents.formatCurrency(bid.oldValues.bidAmount)}</td>
                <td>{bid.oldValues && VpComponents.formatCurrency(bid.oldValues.maxCost)}</td>
                <td moduleClassName="strong">{bid.newValues && VpComponents.formatCurrency(bid.newValues.bidAmount)}</td>
                <td moduleClassName="strong">{bid.newValues && VpComponents.formatCurrency(bid.newValues.maxCost)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

ChangedBidsTable.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  changedBids: PropTypes.shape({}).isRequired,
};

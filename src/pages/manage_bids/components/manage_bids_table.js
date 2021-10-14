import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VpComponents } from '@vp-components';
import { TableRowAccordion, ToolTip } from '@arubaito';
import OverallCampaignSummary from './overall_campaign_summary';
import TableLoader from '../../../utils/TableLoader';
import './manage_bids_table.scss';

const COL_FALLBACK = '-';

const HeadingToolTip = ({ title, children }) => (
  <ToolTip
    targetId="ppl-anchor"
    placement="top"
    trigger={
      <div data-cy="bids-header-label">
        <span className="gdm-icon gdm-icon-sm gdm-icon-info" />
        {title}
      </div>
    }
  >
    {children}
  </ToolTip>
);

const Table = ({ products, sizes, metrics, isLoading, isFetchError }) => {
  const filterNullBidRows = (sizeList) => sizeList.filter((srow) => srow.biddingAvailable === true);
  const showLoader = !isLoading && (!products.length || !Object.keys(sizes[products[0].productId] || {}).length);

  const returnTableRow = (product) => {
    const { productId, productLabel } = product;
    const selectedSize = sizes[productId] || [];
    const selectedSizeLength = selectedSize.length;

    return (
      <TableRowAccordion
        key={productId}
        rowsLength={selectedSizeLength}
        render={(onToggle) => (
          <>
            {filterNullBidRows(selectedSize).map((row, i) => (
              <tr key={row.label}>
                {i === 0 ? (
                  <td data-cy="bids-body-label">
                    <TableRowAccordion.ToggleButton
                      data-cy="show-all-size-bids-btn"
                      onClick={onToggle}
                      className="gdm-w-3 gdm-text-left"
                      title={productLabel}
                    >
                      {productLabel}
                    </TableRowAccordion.ToggleButton>
                  </td>
                ) : (
                  <td />
                )}
                <td data-cy="bids-body-label" title={row.label}>
                  {row.label || COL_FALLBACK}
                </td>
                <td data-cy="bids-body-label">{VpComponents.formatCurrency(row.baseCpl)}</td>
                <td data-cy="bids-body-label">{VpComponents.formatCurrency(row.winningBid)}</td>
                <td data-cy="bids-body-label">
                  <Link className="gdm-link-default default-bid-link" to={`/vp/ppl/bids/edit/${String(productId)}`}>
                    <span className="bid-value">{VpComponents.formatCurrency(row.bidAmount, null, 'Place bid')} </span>
                    <span className="gdm-icon gdm-icon-sm gdm-icon-edit" moduleClassName="icon-align" />
                  </Link>
                </td>
                <td data-cy="bids-body-label">{VpComponents.formatNumber(row.customBidsCount)}</td>
                <td data-cy="bids-body-label">{VpComponents.formatCurrency(row.maxCost)}</td>
                <td data-cy="bids-body-label">{row.avgPosition || COL_FALLBACK}</td>
                <td data-cy="bids-body-label">{row.recommendationRate}&#37;</td>
              </tr>
            ))}
          </>
        )}
      />
    );
  };

  return (
    <>
      <table className="gdm-table gdm-table-reset gdm-text-center gdm-w-24 gdm-z-index-default gdm-m-bottom-xxl" moduleClassName="manage-bids-table">
        <thead>
          <tr>
            <th data-cy="bids-header-label" className="gdm-text-left">
              Product
            </th>
            <th data-cy="bids-header-label" className="gdm-text-left">
              Size Band
            </th>
            <th>
              <HeadingToolTip title="Base CPL">
                The Base CPL (Cost per Lead) is the standard price charged for a lead based on the size of the buyer. If you do not have an active
                bid, you will pay this amount for every lead we send you.
              </HeadingToolTip>
            </th>
            <th>
              <HeadingToolTip title="Max. Market Bid">The highest current bid relative to all active bids.</HeadingToolTip>
            </th>
            <th>
              <HeadingToolTip title="Default Bid">
                The default amount you are willing to pay for a lead. If you have no custom bids, your default bid will apply to all leads we send
                you.
              </HeadingToolTip>
            </th>
            <th>
              <HeadingToolTip title="Custom Bids">
                Custom bids allow you to specify a unique bid amount for a size and segment combination. If you do not have a custom bid applied for a
                given segment, your default bid amount will be applied.
              </HeadingToolTip>
            </th>
            <th>
              <HeadingToolTip title="Max. Cost">
                The max actual amount you will pay for a lead. This is typically less than your Default Bid amount, and only $5 more than the bid
                immediately below you. In the case of a tie, all bidders pay their max bid.
              </HeadingToolTip>
            </th>
            <th>
              <HeadingToolTip title="Avg. Pos">
                Your average position out of all leads that your product appears available to recommend over the past 7 days. If we do not have enough
                recent lead data, this column appears blank.
              </HeadingToolTip>
            </th>
            <th>
              <HeadingToolTip title="Rec. Rate">
                Your recommendation rate is the percent of leads we recommended your product on out of the leads you were eligible to receive over the
                past 7 days.
              </HeadingToolTip>
            </th>
          </tr>
        </thead>
        {showLoader ? (
          <tbody>
            <TableLoader colSpan={9} isError={isFetchError} rowLength={products.length} />
          </tbody>
        ) : (
          products.map((product) => returnTableRow(product))
        )}
      </table>
      <OverallCampaignSummary metrics={metrics} />
    </>
  );
};

Table.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  sizes: PropTypes.shape(PropTypes.number[{}]).isRequired,
  metrics: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFetchError: PropTypes.bool.isRequired,
};

HeadingToolTip.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};

HeadingToolTip.defaultProps = {
  children: <></>,
};

export default Table;

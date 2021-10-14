import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import setChangedBid from '@ppl/redux/actions/edit_bids/set_changed_bid';
import setSelectedBid from '@ppl/redux/actions/edit_bids/set_selected_bid';
import getEdidPageData from '@ppl/selectors/get_edit_page_data';
import fetchSegmentsBids from '@ppl/redux/actions/fetch_segments';
import { VpComponents } from '@vp-components';
import NumberFormat from 'react-number-format';
import { DELETE_CHANGED_BID } from '@ppl/redux/reducers/changed_bids_reducer';
import { InputField, TableRowAccordion, ToolTip } from '@arubaito';
import TableLoader from '../../../utils/TableLoader';
import './edit_bids_table.scss';

const FALLBACK = '-';

const filterNullBidRows = (sizeList) => sizeList.filter((srow) => srow.biddingAvailable === true);

const getBidError = (bidAmount, baseCpl) => (bidAmount > baseCpl ? 'Bid must be in an increments of $5.' : 'Bid must be higher than the base CPL');

const returnSegmentBidsRow = (segment, segmentIndex, sizeId, sizeKey, changedBids, openAccordion, dispatch, productId, baseCpl) => {
  const segmentKey = sizeKey + segmentIndex + 1;
  const hasError = changedBids[segmentKey] && changedBids[segmentKey].invalid;
  const bidAmount = changedBids[segmentKey] ? changedBids[segmentKey].newValues.bidAmount : segment.bid;
  const hasSegmentBidChange = !hasError && bidAmount !== segment.bid;

  return (
    <tr key={segment.id}>
      <td className="gdm-w-1" />
      <td className="gdm-w-1 gdm-keep-border gdm-p-none">{hasSegmentBidChange && <div moduleClassName="icon-filled-circle" />}</td>
      <td className="gdm-w-7 gdm-p-left-none gdm-p-right-none gdm-text-left">{segment.label}</td>
      <td className="gdm-w-4 gdm-allow-overflow">
        <InputField
          className="gdm-m-top-none"
          status={hasError ? 'error' : ''}
          render={(id, status) => (
            <>
              <InputField.Input
                id={id}
                status={status}
                name={segment.label}
                autoComplete="off"
                value={bidAmount}
                onFocus={() => {
                  dispatch(
                    setSelectedBid({
                      type: 'segment',
                      changedBidKey: segmentKey,
                      productId,
                      sizeId,
                      id: segment.id,
                    })
                  );
                }}
                onValueChange={VpComponents.debounce(({ floatValue }) => {
                  dispatch(
                    setChangedBid({
                      key: segmentKey,
                      amount: floatValue,
                      baseCpl,
                    })
                  );
                }, 250)}
                component={<NumberFormat />}
                displayType="input"
                decimalScale={0}
                thousandSeparator
                allowNegative={false}
                prefix="$"
                className="gdm-m-bottom-none gdm-text-center"
                disabled={!openAccordion}
                small
              />
              <InputField.AlertMessage status={status} inline>
                {getBidError(bidAmount, baseCpl)}
                <span
                  role="button"
                  tabIndex="-1"
                  className="gdm-link-dark gdm-m-left-xs"
                  onClick={() => dispatch({ type: DELETE_CHANGED_BID, key: segmentKey })}
                  onKeyDown={() => dispatch({ type: DELETE_CHANGED_BID, key: segmentKey })}
                >
                  Reset Bid
                </span>
              </InputField.AlertMessage>
            </>
          )}
        />
      </td>
      {hasError ? (
        <>
          <td className="gdm-w-2" />
          <td className="gdm-w-3" />
          <td className="gdm-w-3" />
          <td className="gdm-w-3" />
        </>
      ) : (
        <>
          <td className="gdm-w-2">{segment.avgPosition || FALLBACK}</td>
          <td className="gdm-w-3">{FALLBACK}</td>
          <td className="gdm-w-3">{VpComponents.formatCurrency(segment.highestBid)}</td>
          <td className="gdm-w-3">{FALLBACK}</td>
        </>
      )}
    </tr>
  );
};

const returnSegmentBidRows = (segments, sizeId, sizeKey, changedBids, open, dispatch, productId, baseCpl) =>
  (segments || []).map((segment, segmentIndex) =>
    returnSegmentBidsRow(segment, segmentIndex, sizeId, sizeKey, changedBids, open, dispatch, productId, baseCpl)
  );

const returnAccordionRow = (size, sizeIndex, segments, changedBids, dispatch, productId, activeProduct = {}, apiRef, sizeState) => {
  const sizeKey = (sizeIndex + 1) * 100;
  const hasError = changedBids[sizeKey] && changedBids[sizeKey].invalid;
  const bidAmount = changedBids[sizeKey] ? changedBids[sizeKey].newValues.bidAmount : size.bidAmount;
  const sizeSegments = (segments && segments[size.id]) || [];
  const rowLength = sizeSegments && sizeSegments.length > 0 ? sizeSegments.length : 3;
  // by default we need a minimum of 2 rows to show the accordion, added +1 extra for the table row loader.

  const BidChangeCircle = () => {
    if (!hasError && bidAmount !== size.bidAmount) return <div moduleClassName="icon-filled-circle" />;

    let hasHollowCircle = false;
    const changedBidKeys = Object.keys(changedBids);
    if (changedBidKeys.length) {
      for (let i = 0; i < changedBidKeys.length; i++) {
        if (+changedBidKeys[i] > sizeKey && +changedBidKeys[i] < sizeKey + 100) {
          const pendingBid = changedBids[changedBidKeys[i]];
          if (!pendingBid.invalid) {
            hasHollowCircle = true;
            break;
          }
        }
      }
    }
    return hasHollowCircle ? <div moduleClassName="icon-hollow-circle" /> : <></>;
  };

  const { sizeDetail, setSizeDetail } = sizeState;
  const onClickToggleButton = (toggle) => {
    toggle();

    const fetchSegments = async () => {
      try {
        apiRef.current[size.id] = true;
        await dispatch(fetchSegmentsBids(productId, [size.id]));
      } catch (e) {
        setSizeDetail({ ...sizeDetail, [size.id]: { ...sizeDetail[size.id], isFetchError: true } });
      } finally {
        delete apiRef.current[size.Id];
      }
    };

    if (!apiRef.current[size.id]) {
      fetchSegments();
    }
  };

  const toggleRowButton = (onToggle) =>
    activeProduct.advancedBiddingAvailable ? (
      <TableRowAccordion.ToggleButton moduleClassName="no-outline" onClick={() => onClickToggleButton(onToggle)}>
        {size.label}
      </TableRowAccordion.ToggleButton>
    ) : (
      <span className="gdm-paragraph-sm">{size.label}</span>
    );

  return (
    <TableRowAccordion
      moduleClassName="table-row-accordion"
      key={sizeKey}
      rowsLength={rowLength}
      render={(onToggle, open) => (
        <>
          <tr data-cy="bid-row">
            <td className="gdm-w-1 gdm-p-none">
              <BidChangeCircle />
            </td>
            <td className="gdm-w-8 gdm-relative gdm-text-left">{toggleRowButton(onToggle)}</td>
            <td className="gdm-w-4 gdm-allow-overflow">
              <InputField
                className="gdm-m-top-none"
                status={hasError ? 'error' : ''}
                render={(id, status) => (
                  <>
                    <InputField.Input
                      id={id}
                      status={status}
                      name={size.label}
                      autoComplete="off"
                      value={bidAmount}
                      data-cy="bid-input"
                      onFocus={() => {
                        dispatch(
                          setSelectedBid({
                            type: 'size',
                            changedBidKey: sizeKey,
                            id: size.id,
                            productId,
                          })
                        );
                      }}
                      onValueChange={VpComponents.debounce(({ floatValue }) => {
                        dispatch(
                          setChangedBid({
                            key: sizeKey,
                            amount: floatValue,
                            baseCpl: size.baseCpl,
                          })
                        );
                      }, 250)}
                      component={<NumberFormat />}
                      displayType="input"
                      decimalScale={0}
                      thousandSeparator
                      allowNegative={false}
                      prefix="$"
                      className="gdm-m-bottom-none gdm-text-center"
                      small
                    />
                    <InputField.AlertMessage status={status} inline>
                      {getBidError(bidAmount, size.baseCpl)}
                      <span
                        role="button"
                        tabIndex="0"
                        className="gdm-link-dark gdm-m-left-xs"
                        onClick={() => dispatch({ type: DELETE_CHANGED_BID, key: sizeKey })}
                        onKeyDown={() => dispatch({ type: DELETE_CHANGED_BID, key: sizeKey })}
                      >
                        Reset Bid
                      </span>
                    </InputField.AlertMessage>
                  </>
                )}
              />
            </td>
            {hasError ? (
              <>
                <td className="gdm-w-2" />
                <td className="gdm-w-3" />
                <td className="gdm-w-3" />
                <td className="gdm-w-3" />
              </>
            ) : (
              <>
                <td className="gdm-w-2">{size.avgPosition}</td>
                <td className="gdm-w-3">{VpComponents.formatCurrency(size.baseCpl)}</td>
                <td className="gdm-w-3">{VpComponents.formatCurrency(size.maxCost)}</td>
                <td className="gdm-w-3">{size.recommendationRate}&#37;</td>
              </>
            )}
          </tr>
          <tr>
            <td className="gdm-w-1" />
            <td className="gdm-w-23 gdm-heading-sm gdm-text-left gdm-p-left-none">Custom Bids</td>
          </tr>
          {sizeSegments.length > 0 ? (
            returnSegmentBidRows(sizeSegments, size.id, sizeKey, changedBids, open, dispatch, productId, size.baseCpl)
          ) : (
            <TableLoader isError={sizeDetail[size.id] && sizeDetail[size.id].isFetchError} />
          )}
        </>
      )}
    />
  );
};

const returnRows = (sizes, segments, changedBids, dispatch, productId, activeProduct, apiRef, sizeState) =>
  filterNullBidRows(sizes[activeProduct.productId]).map((size, sizeIndex) =>
    returnAccordionRow(size, sizeIndex, segments, changedBids, dispatch, productId, activeProduct, apiRef, sizeState)
  );

const Table = ({ productId }) => {
  const [sizeDetail, setSizeDetail] = useState({});
  const dispatch = useDispatch();
  // apiRef will prevent the calling of same API If it is already called
  const apiRef = useRef({});
  const { segments, sizes, changedBids, activeProduct } = useSelector((state) => getEdidPageData(state, productId));

  if (!Object.keys(sizes).length || !activeProduct) return null;

  return (
    <table className="gdm-table gdm-table-reset gdm-table-inputs gdm-text-center gdm-w-24" moduleClassName="edit-bids-table">
      <thead>
        <tr>
          <th className="gdm-w-1 gdm-keep-border gdm-p-none" />
          <th className="gdm-w-8 gdm-text-left">
            Size Band
            {activeProduct.advancedBiddingAvailable && ' and Custom Bids'}
          </th>
          <th className="gdm-w-4">
            <ToolTip
              targetId="ppl-anchor"
              placement="top"
              trigger={
                <div>
                  <span className="gdm-icon gdm-icon-sm gdm-icon-info" />
                  <div>Default</div>
                  Bid
                </div>
              }
            >
              The default amount you are willing to pay for a lead. If you have no custom bids, your default bid will apply to all leads we send you.
            </ToolTip>
          </th>
          <th className="gdm-w-2">
            <ToolTip
              targetId="ppl-anchor"
              placement="top"
              trigger={
                <div>
                  <span className="gdm-icon gdm-icon-sm gdm-icon-info" />
                  Avg. Pos.
                </div>
              }
            >
              Your average position out of all leads that your product appears available to recommend over the past 7 days. If we do not have enough
              recent lead data, this column appears blank.
            </ToolTip>
          </th>
          <th className="gdm-w-3">
            <ToolTip
              targetId="ppl-anchor"
              placement="top"
              trigger={
                <div>
                  <span className="gdm-icon gdm-icon-sm gdm-icon-info" />
                  Base CPL
                </div>
              }
            >
              The Base CPL (Cost per Lead) is the standard price charged for a lead based on the size of the buyer. If you do not have an active bid,
              you will pay this amount for every lead we send you.
            </ToolTip>
          </th>
          <th className="gdm-w-3">
            <ToolTip
              targetId="ppl-anchor"
              placement="top"
              trigger={
                <div>
                  <span className="gdm-icon gdm-icon-sm gdm-icon-info" />
                  Max Cost
                </div>
              }
            >
              The max actual amount you will pay for a lead. This is typically less than your Default Bid amount, and only $5 more than the bid
              immediately below you. In the case of a tie, all bidders pay their max bid.
            </ToolTip>
          </th>
          <th className="gdm-w-3">
            <ToolTip
              targetId="ppl-anchor"
              placement="top"
              trigger={
                <div>
                  <span className="gdm-icon gdm-icon-sm gdm-icon-info" />
                  Rec. Rate
                </div>
              }
            >
              Your recommendation rate is the percent of leads we recommended your product on out of the leads you were eligible to receive over the
              past 7 days.
            </ToolTip>
          </th>
        </tr>
      </thead>
      {returnRows(sizes, segments, changedBids, dispatch, productId, activeProduct, apiRef, { sizeDetail, setSizeDetail })}
    </table>
  );
};

Table.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Table;

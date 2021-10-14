import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import getProduct from '@ppl/selectors/get_product';
import selectChangedBids from '@ppl/selectors/changed_bids';
import ChangedBids from '../changed_bids';
import ChangedBidsHeader from '../components/changed_bids_header';
import ChangedBidsBody from '../components/changed_bids_body';
import ChangedBidsTable from '../components/changed_bids_table';
import PendingChanges from '../components/pending_changes';

const EditChangedBids = () => {
  const { productId } = useParams();
  const { pendingChanges, changedBids } = useSelector(selectChangedBids);
  const product = useSelector(state => getProduct(state, productId)) || {};

  const header = (
    <ChangedBidsHeader>
      <PendingChanges count={pendingChanges} />
    </ChangedBidsHeader>
  );

  const body = (
    <ChangedBidsBody>
      <ChangedBidsTable product={product} changedBids={changedBids} />
    </ChangedBidsBody>
  );

  return <ChangedBids header={header} body={body} isBidChanged={pendingChanges > 0} />;
};

export default EditChangedBids;

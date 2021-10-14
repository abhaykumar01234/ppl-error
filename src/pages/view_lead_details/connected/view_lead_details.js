import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchViewLeadDetails from '@ppl/redux/actions/view_lead_details/fetch_view_lead_details';
import withLoader from '@ppl/utils/with_loader';
import { useRedirectOnError } from '@ppl/custom_hooks/useRedirect';
import DataSheet from '../components/view_lead_data_sheet';

const ViewLeadDetails = () => {
  const dispatch = useDispatch();
  const lead = useSelector(state => state.leadDetails);
  const { id } = useParams();

  useRedirectOnError(async () => {
    const leadsData = await dispatch(fetchViewLeadDetails(id));
    return leadsData;
  }, '/vp/ppl/leads');

  return (
    <>
      <DataSheet lead={lead} />
    </>
  );
};

export default withLoader(ViewLeadDetails);

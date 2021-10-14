import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toDateString, getFirstDay, getYesterday } from '@ppl/utils/date';
import withLoader from '@ppl/utils/with_loader';
import fetchVendor from '@ppl/redux/actions/fetch_vendor';
import fetchLeads from '@ppl/redux/actions/fetch_leads';
import Header from '../components/view_leads_header';
import Table from '../components/view_leads_table';

const ViewLeads = () => {
  const [fetchingData, setFetchingData] = useState({ status: 'idle' });
  const dispatch = useDispatch();
  const {
    leads,
    leadsReport,
    vendor,
  } = useSelector(state => state);

  useEffect(() => {
    setFetchingData({ status: 'pending' });

    Promise.all([
      dispatch(fetchVendor()),
      dispatch(fetchLeads(vendor.id, {
        startDate: toDateString(getFirstDay()),
        endDate: toDateString(getYesterday()),
      }))
    ])
      .then(() => { setFetchingData({ status: 'success' }); })
      .catch(() => { setFetchingData({ status: 'error' }); });

  }, []);

  return (
    <>
      <Header vendor={vendor} leadsReport={leadsReport} fetchingData={fetchingData} setFetchingData={setFetchingData} />
      <hr />
      <Table fetchingData={fetchingData} leads={leads} />
    </>
  );
};

export default withLoader(ViewLeads);

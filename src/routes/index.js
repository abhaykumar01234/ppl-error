import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ManageBids from '@ppl/pages/manage_bids';
import EditBids from '@ppl/pages/edit_bids';
import ChangedBids from '@ppl/pages/changed_bids';
import ViewLeads from '@ppl/pages/view_leads';
import ViewLeadDetails from '@ppl/pages/view_lead_details';
import BillingHistory from '@ppl/pages/billing_history';
import PaymentDetails from '@ppl/pages/payment_details';
import Invoice from '@ppl/pages/invoice';
import BidFilters from '@ppl/pages/bid_filters';
import hasFeatureFlag from '@ppl/utils/check_feature_flags';

export default function Routes() {
  const match = useRouteMatch();

  const baseUrl = process.env.REACT_APP_ALLOW_VPF_ROUTER_ONLY ? match.path : '/vp/ppl';

  return (
    <>
      <Switch>
        <Redirect from="/" to={`${baseUrl}/bids`} exact />
        <Route path={`${baseUrl}/bids`} component={ManageBids} exact />
        <Route path={`${baseUrl}/bids/filters`} component={BidFilters} />
        <Route path={`${baseUrl}/bids/edit/:productId`} component={EditBids} />
        <Route path={`${baseUrl}/leads`} component={ViewLeads} exact />
        <Route path={`${baseUrl}/leads/:id`} component={ViewLeadDetails} exact />
        {hasFeatureFlag('ppl_billing') && (
          <>
            <Route path={`${baseUrl}/billing-history/payment/:billId`} component={PaymentDetails} />
            <Route path={`${baseUrl}/billing-history/invoice/:id`} component={Invoice} />
            <Route exact path={`${baseUrl}/billing-history`} component={BillingHistory} />
          </>
        )}
      </Switch>
      <Switch>
        <Route path={`${baseUrl}/bids/edit/:productId`} component={ChangedBids} />
      </Switch>
    </>
  );
}

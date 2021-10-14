import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ManageBids from '@ppl/pages/manage_bids';
// import EditBids from '@ppl/pages/edit_bids';
// import ChangedBids from '@ppl/pages/changed_bids';
import ViewLeads from '@ppl/pages/view_leads';
import ViewLeadDetails from '@ppl/pages/view_lead_details';
// import BillingHistory from '@ppl/pages/billing_history';
// import PaymentDetails from '@ppl/pages/payment_details';
// import Invoice from '@ppl/pages/invoice';
// import BidFilters from '@ppl/pages/bid_filters';
// import hasFeatureFlag from '@ppl/utils/check_feature_flags';

export default function Routes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Redirect from="/" to={`${match.path}/bids`} exact />
        <Route path={`${match.path}/bids`} component={ManageBids} exact />
        {/* <Route path={`${match.path}/bids/filters`} component={BidFilters} />
        <Route path={`${match.path}/bids/edit/:productId`} component={EditBids} /> */}
        <Route path={`${match.path}/leads`} component={ViewLeads} exact />
        <Route path={`${match.path}/leads/:id`} component={ViewLeadDetails} exact />
        {/* {hasFeatureFlag('ppl_billing') && (
          <>
            <Route
              path={`${match.path}/billing-history/payment/:billId`}
              component={PaymentDetails}
            />
            <Route path={`${match.path}/billing-history/invoice/:id`} component={Invoice} />
            <Route exact path={`${match.path}/billing-history`} component={BillingHistory} />
          </>
        )} */}
      </Switch>
      {/* <Switch>
        <Route path={`${match.path}/bids/edit/:productId`} component={ChangedBids} />
      </Switch> */}
    </>
  );
}

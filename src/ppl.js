import React from 'react';
import './ppl.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '@ppl/redux/store';
import Routes from '@ppl/routes';
import Alerts from '@ppl/pages/alerts';

const PPL = () => {
  const appRoutes = (
    <div className="ppl-wrapper" id="ppl-anchor">
      <div className="gdm-relative gdm-m-top-md gdm-m-bottom-md">
        <Routes />
        <Alerts />
      </div>
    </div>
  );

  const routes = process.env.REACT_APP_ALLOW_VPF_ROUTER_ONLY ? (
    appRoutes
  ) : (
    <Router>{appRoutes}</Router>
  );

  return <Provider store={store}>{routes}</Provider>;
};

export default PPL;

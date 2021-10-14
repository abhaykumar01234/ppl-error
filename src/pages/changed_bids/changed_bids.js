import React from 'react';
import { Drawer } from '@arubaito';
import './changed_bids.scss';

const ChangedBids = ({ body, header, isBidChanged }) => (
  <Drawer
    moduleClassName="drawer"
    show={isBidChanged}
    renderHeader={toggle => (
      <Drawer.Header>
        <Drawer.Toggle
          data-gtm="pplbidding-editbid-drawertoggle"
          iconClassName="gdm-icon-md"
          onClick={toggle}
          moduleClassName="toggle-btn"
        />
        {header}
      </Drawer.Header>
    )}
    renderContent={() => (
      <Drawer.Content>
        {body}
      </Drawer.Content>
    )}
  />
);

export default ChangedBids;

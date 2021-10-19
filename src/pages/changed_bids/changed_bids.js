import React from 'react';
import { Drawer } from '@arubaito';
import s from './changed_bids.module.scss';

const ChangedBids = ({ body, header, isBidChanged }) => (
  <Drawer
    className={s.drawer}
    show={isBidChanged}
    renderHeader={toggle => (
      <Drawer.Header>
        <Drawer.Toggle
          data-gtm="pplbidding-editbid-drawertoggle"
          iconClassName="gdm-icon-md"
          onClick={toggle}
          className={s["toggle-btn"]}
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

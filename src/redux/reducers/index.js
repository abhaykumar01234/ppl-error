import products from './products_reducer';
import selectedProduct from './selected_product_reducer';
import selectedProductFilters from './selected_product_filters_reducer';
import markets from './markets_reducer';
import metrics from './metrics_reducer';
import selectedMarket from './selected_market_reducer';
import sizes from './sizes_reducer';
import vendor from './vendor_reducer';
import isLoading from './loading_reducer';
import segments from './segments_reducer';
import alerts from './alerts';
import leads from './leads_reducer';
import leadDetails from './lead_details_reducer';
import leadsReport from './leads_report_reducer';

import changedBids from './changed_bids_reducer';
import selectedBid from './selected_bid_reducer';
import auctionBids from './auction_bids_reducer';

export default {
  products,
  selectedProduct,
  selectedProductFilters,
  vendor,
  metrics,
  markets,
  selectedMarket,
  sizes,
  segments,
  leads,
  leadDetails,
  leadsReport,
  changedBids,
  selectedBid,
  auctionBids,
  isLoading,
  alerts,
};

const SIZE_HEADING = 'Size';
const SIZE_HEADING_NOTE = "You're opted in to receive leads to buyers in the following size categories.";

const INDUSTRIES_HEADING = 'Industries';
const INDUSTRIES_HEADING_NOTE = "You're opted in to receive leads to buyers in the following Industries.";

const FUNCTIONALITIES_HEADING = 'Functionalities';
const FUNCTIONALITIES_HEADING_NOTE = "You're opted in to receive leads to buyers who need the following applications. Some application filters include additional capabilities (often more specific software modules) that can be used for more granular filtering. However, our PPL Refund Policy only gurantees filtering at the application level.";

const DEPLOYMENT_OPTIONS_HEADING = 'Deployment Options';
const DEPLOYMENT_OPTIONS_HEADING_NOTE = "You're opted in to receive leads to buyers in the following deployment options.";
const DEPLOYMENT_OPTIONS_LABEL_HELPER_TEXT = {
  'On-premise': 'Buyers who want the software deployed on premise',
  'Web-based': 'Buyers who prefer cloud or software-as-a-service deployment',
};

const COUNTRIES_HEADING = 'Countries';
const COUNTRIES_HEADING_NOTE = "You're opted in to receive leads to buyers in the following countries.";

const FORM_CONTROL_LABEL_TEXT = 'Must be sold';
const RADIO_BUTTON_OPTIONS = [
  { label: 'Does not offer', value: 0 },
  { label: 'Offers, but with suite', value: 1 },
  { label: 'Offers strongly in suite', value: 2 },
  { label: 'Best-of-breed', value: 3 },
  { label: 'Offered through partner', value: 4 },
];

const REGIONS = [
  {
    id: 23,
    name: 'Top Locations',
  },
  {
    id: 4,
    name: 'Asia',
  },
  {
    id: 3,
    name: 'Europe',
  },
  {
    id: 6,
    name: 'Africa',
  },
  {
    id: 9,
    name: 'Oceania',
  },
  {
    id: 21,
    name: 'North America',
  },
  {
    id: 22,
    name: 'South America',
  },
];

export {
  SIZE_HEADING,
  SIZE_HEADING_NOTE,
  INDUSTRIES_HEADING,
  INDUSTRIES_HEADING_NOTE,
  FUNCTIONALITIES_HEADING,
  FUNCTIONALITIES_HEADING_NOTE,
  DEPLOYMENT_OPTIONS_HEADING,
  DEPLOYMENT_OPTIONS_HEADING_NOTE,
  DEPLOYMENT_OPTIONS_LABEL_HELPER_TEXT,
  COUNTRIES_HEADING,
  COUNTRIES_HEADING_NOTE,
  FORM_CONTROL_LABEL_TEXT,
  RADIO_BUTTON_OPTIONS,
  REGIONS,
};

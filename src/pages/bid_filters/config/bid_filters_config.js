/* eslint-disable react/prop-types */
import React from 'react';
import FilterSizes from '../components/filter_sizes';
import FilterIndustries from '../components/filter_industries';
import FilterFunctionalities from '../components/filter_functionalities';
import FilterDeploymentOptions from '../components/filter_deployment_options';
import FilterCountries from '../components/filter_countries';
import {
  SIZE_HEADING,
  SIZE_HEADING_NOTE,
  INDUSTRIES_HEADING,
  INDUSTRIES_HEADING_NOTE,
  FUNCTIONALITIES_HEADING,
  FUNCTIONALITIES_HEADING_NOTE,
  DEPLOYMENT_OPTIONS_HEADING,
  DEPLOYMENT_OPTIONS_HEADING_NOTE,
  COUNTRIES_HEADING,
  COUNTRIES_HEADING_NOTE
} from './constants';

const bidFiltersConfig = [
  {
    heading: SIZE_HEADING,
    headingNote: SIZE_HEADING_NOTE,
    getComponent: ({ sizes }) => <FilterSizes sizes={sizes} />
  },
  {
    heading: INDUSTRIES_HEADING,
    headingNote: INDUSTRIES_HEADING_NOTE,
    getComponent: ({ industries }) => <FilterIndustries industries={industries} />
  },
  {
    heading: FUNCTIONALITIES_HEADING,
    headingNote: FUNCTIONALITIES_HEADING_NOTE,
    getComponent: ({ functionalities }) => (
      <FilterFunctionalities functionalities={functionalities} />
    )
  },
  {
    heading: DEPLOYMENT_OPTIONS_HEADING,
    headingNote: DEPLOYMENT_OPTIONS_HEADING_NOTE,
    getComponent: ({ deploymentOptions }) => (
      <FilterDeploymentOptions deploymentOptions={deploymentOptions} />
    )
  },
  {
    heading: COUNTRIES_HEADING,
    headingNote: COUNTRIES_HEADING_NOTE,
    getComponent: ({ countries }) => <FilterCountries countries={countries} />
  }
];

export default bidFiltersConfig;

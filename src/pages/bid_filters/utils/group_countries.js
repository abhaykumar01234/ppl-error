/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import cloneDeep from 'lodash.clonedeep';
import { REGIONS } from '../config/constants';

const regionByIDs = REGIONS.reduce((total, curr) => {
  curr.countries = [];
  curr.id = String(curr.id);
  total[curr.id] = curr;
  return total;
}, {});

function groupCountries(countries) {
  const regionByID1 = cloneDeep(regionByIDs);
  // eslint-disable-next-line camelcase
  countries.forEach(({ id, name, is_active, region_ids }) => {
    region_ids.forEach(rid => {
      const temp = regionByID1[rid];
      temp.countries = [
        ...temp.countries,
        {
          id: String(id),
          name,
          isActive: is_active,
          otherParentIDs: region_ids.filter(curId => curId !== rid).map(r => String(r))
        }
      ];
    });
  });

  return Object.values(regionByID1).sort((c1, c2) => Number(c2.id) - Number(c1.id));
}

export default groupCountries;

import { createSelector } from 'reselect';

const getChangedBids = changedBids => ({
  changedBids,
  pendingChanges: Object.keys(changedBids).filter(k => !changedBids[k].invalid).length
});

export default createSelector(state => state.changedBids, getChangedBids);

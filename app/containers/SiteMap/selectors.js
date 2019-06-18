import { createSelector } from 'reselect';

const selectSiteMap = state => state.get('site-map');

const makeSelectBlogs = () =>
  createSelector(
    selectSiteMap,
    siteMapState => siteMapState.get('data'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectSiteMap,
    siteMapState => siteMapState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectSiteMap,
    siteMapState => siteMapState.get('error'),
  );

export { selectSiteMap, makeSelectBlogs, makeSelectLoading, makeSelectError };

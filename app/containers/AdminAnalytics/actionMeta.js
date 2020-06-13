const actionMeta = {
  key: 'adminAnalytics',
  actionDefinitions: [
    {
      LOAD_ANALYTICS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingAnalytics: true,
        loadAnalyticsError: null,
      },
    },
    {
      LOAD_ANALYTICS_REGISTER_SUCCESS: 'tbd',
      attributes: ['analytics'],
      stateMutations: {
        loadingAnalytics: false,
        loadAnalyticsSuccess: true,
        analytics: action => action.analytics,
      },
    },
    {
      LOAD_ANALYTICS_REGISTER_ERROR: 'tbd',
      attributes: ['loadAnalyticsError'],
      stateMutations: {
        loadingAnalytics: false,
        loadAnalyticsSuccess: false,
        loadAnalyticsError: action => action.loadAnalyticsError,
      },
    },
  ],
};

export default actionMeta;

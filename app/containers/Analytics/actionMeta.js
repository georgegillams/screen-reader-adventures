const actionMeta = {
  key: 'analytics',
  actionDefinitions: [
    {
      SEND: 'tbd',
      attributes: ['analytic'],
      stateMutations: {
        analytic: action => action.analytic,
      },
    },
    {
      SEND_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        sending: false,
        sendSuccess: true,
        sendError: null,
      },
    },
    {
      SEND_REGISTER_ERROR: 'tbd',
      attributes: ['sendError'],
      stateMutations: {
        sending: false,
        sendSuccess: false,
        sendError: action => action.sendError,
      },
    },
  ],
};

export default actionMeta;

const actionMeta = {
  key: 'adminusers',
  actionDefinitions: [
    {
      LOAD_USERS: 'tbd',
      attributes: [],
      stateMutations: {
        loading: true,
        loadUserError: null,
      },
    },
    {
      LOAD_USERS_REGISTER_SUCCESS: 'tbd',
      attributes: ['users'],
      stateMutations: {
        loading: false,
        loadUserSuccess: true,
        users: action => action.users,
      },
    },
    {
      LOAD_USERS_REGISTER_ERROR: 'tbd',
      attributes: ['loadUserError'],
      stateMutations: {
        loading: false,
        loadUserSuccess: false,
        loadUserError: action => action.loadUserError,
      },
    },
    {
      REQUEST_MAGIC_LINK_FOR_USER: 'tbd',
      attributes: ['magicLinkUser'],
      stateMutations: {
        magicLinkUser: action => action.magicLinkUser,
      },
    },
  ],
};

export default actionMeta;

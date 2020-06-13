const actionMeta = {
  key: 'adminusers',
  actionDefinitions: [
    {
      LOAD_USERS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingUsers: true,
        loadUserError: null,
      },
    },
    {
      LOAD_USERS_REGISTER_SUCCESS: 'tbd',
      attributes: ['users'],
      stateMutations: {
        loadingUsers: false,
        loadUserSuccess: true,
        users: action => action.users,
      },
    },
    {
      LOAD_USERS_REGISTER_ERROR: 'tbd',
      attributes: ['loadUserError'],
      stateMutations: {
        loadingUsers: false,
        loadUserSuccess: false,
        loadUserError: action => action.loadUserError,
      },
    },
    {
      DELETE_USER: 'tbd',
      attributes: ['userToDelete'],
      stateMutations: {
        deletingUser: true,
        deleteUserError: null,
        userToDelete: action => action.userToDelete,
      },
    },
    {
      DELETE_USER_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        deletingUser: false,
        deleteUserSuccess: true,
      },
    },
    {
      DELETE_USER_REGISTER_ERROR: 'tbd',
      attributes: ['deleteUserError'],
      stateMutations: {
        deletingUser: false,
        deleteUserSuccess: false,
        deleteUserError: action => action.deleteUserError,
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

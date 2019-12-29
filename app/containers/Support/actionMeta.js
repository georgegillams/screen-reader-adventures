const actionMeta = {
  key: 'support',
  actionDefinitions: [
    {
      LOAD_LINKS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingLinks: true,
        loadLinksError: null,
      },
    },
    {
      LOAD_LINKS_REGISTER_SUCCESS: 'tbd',
      attributes: ['links'],
      stateMutations: {
        loadingLinks: false,
        loadLinksSuccess: true,
        links: action => action.links,
      },
    },
    {
      LOAD_LINKS_REGISTER_ERROR: 'tbd',
      attributes: ['loadLinksError'],
      stateMutations: {
        loadingLinks: false,
        loadLinksSuccess: false,
        loadLinksError: action => action.loadLinksError,
      },
    },
    {
      ADD_LINK: 'tbd',
      attributes: ['linkDefinition'],
      stateMutations: {
        linkDefinition: action => action.linkDefinition,
        addLinkLoading: true,
        addLinkError: null,
      },
    },
    {
      ADD_LINK_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        addLinkLoading: false,
        addLinkSuccess: true,
      },
    },
    {
      ADD_LINK_REGISTER_ERROR: 'tbd',
      attributes: ['addLinkError'],
      stateMutations: {
        addLinkError: action => action.addLinkError,
        addLinkLoading: false,
        addLinkSuccess: false,
      },
    },
    {
      DELETE_LINK: 'tbd',
      attributes: ['linkToDelete'],
      stateMutations: {
        linkToDelete: action => action.linkToDelete,
        deleteLinkLoading: true,
        deleteLinkError: null,
      },
    },
    {
      DELETE_LINK_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        deleteLinkLoading: false,
        deleteLinkSuccess: true,
      },
    },
    {
      DELETE_LINK_REGISTER_ERROR: 'tbd',
      attributes: ['deleteLinkError'],
      stateMutations: {
        delteLinkError: action => action.addLinkError,
        delteLinkLoading: false,
        delteLinkSuccess: false,
      },
    },
  ],
};

export default actionMeta;

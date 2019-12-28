const actionMeta = {
  key: 'blogs',
  actionDefinitions: [
    {
      LOAD_BLOGS: 'tbd',
      attributes: [],
      stateMutations: {
        loading: true,
        loadBlogsError: false,
      },
    },
    {
      LOAD_BLOGS_REGISTER_SUCCESS: 'tbd',
      attributes: ['blogs'],
      stateMutations: {
        loading: false,
        blogs: action => action.blogs,
      },
    },
    {
      LOAD_BLOGS_REGISTER_ERROR: 'tbd',
      attributes: ['loadBlogsError'],
      stateMutations: {
        loading: false,
        loadBlogsError: action => action.loadBlogsError,
      },
    },
  ],
};

export default actionMeta;

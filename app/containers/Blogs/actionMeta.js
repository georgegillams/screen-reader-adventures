const actionMeta = {
  key: 'blogs',
  actionDefinitions: [
    {
      LOAD_BLOGS: 'tbd',
      attributes: [],
      stateMutations: {
        blogsLoading: true,
        blogsLoadError: false,
      },
    },
    {
      LOAD_BLOGS_REGISTER_SUCCESS: 'tbd',
      attributes: ['blogs'],
      stateMutations: {
        blogsLoading: false,
        blogs: action => action.blogs,
      },
    },
    {
      LOAD_BLOGS_REGISTER_ERROR: 'tbd',
      attributes: ['blogsLoadError'],
      stateMutations: {
        blogsLoading: false,
        blogsLoadError: action => action.blogsLoadError,
      },
    },
  ],
};

export default actionMeta;

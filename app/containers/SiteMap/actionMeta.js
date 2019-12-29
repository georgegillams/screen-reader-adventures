const actionMeta = {
  key: 'sitemap',
  actionDefinitions: [
    {
      LOAD_BLOGS: 'tbd',
      attributes: [],
      stateMutations: {
        loadingBlogs: true,
        loadBlogsError: null,
      },
    },
    {
      LOAD_BLOGS_REGISTER_SUCCESS: 'tbd',
      attributes: ['blogs'],
      stateMutations: {
        loadingBlogs: false,
        loadBlogsSuccess: true,
        blogs: action => action.blogs,
      },
    },
    {
      LOAD_BLOGS_REGISTER_ERROR: 'tbd',
      attributes: ['loadBlogsError'],
      stateMutations: {
        loadingBlogs: false,
        loadBlogsSuccess: false,
        loadBlogsError: action => action.loadBlogsError,
      },
    },
  ],
};

export default actionMeta;

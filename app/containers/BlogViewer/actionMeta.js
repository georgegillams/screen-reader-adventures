const actionMeta = {
  key: 'blog-viewer',
  actionDefinitions: [
    {
      LOAD_BLOG: 'tbd',
      attributes: ['blogId'],
      stateMutations: {
        blogId: action => action.blogId,
        blogLoading: true,
        blogLoadError: false,
      },
    },
    {
      LOAD_BLOG_REGISTER_SUCCESS: 'tbd',
      attributes: ['blog'],
      stateMutations: {
        blogLoading: false,
        blogs: (action, prevValue) => ({
          ...prevValue,
          [action.blog.id]: action.blog,
        }),
      },
    },
    {
      LOAD_BLOG_REGISTER_ERROR: 'tbd',
      attributes: ['blogLoadError'],
      stateMutations: {
        blogLoading: false,
        blogLoadError: action => action.blogLoadError,
      },
    },
  ],
};

export default actionMeta;

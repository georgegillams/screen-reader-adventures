const actionMeta = {
  key: 'blog_edit',
  actionDefinitions: [
    {
      LOAD_BLOG: 'tbd',
      attributes: ['blogId'],
      stateMutations: {
        loadingBlog: true,
        loadBlogError: null,
        blogId: action => action.blogId,
      },
    },
    {
      LOAD_BLOG_REGISTER_SUCCESS: 'tbd',
      attributes: ['blog'],
      stateMutations: {
        loadingBlog: false,
        loadBlogSuccess: true,
        blog: action => action.blog,
      },
    },
    {
      LOAD_BLOG_REGISTER_ERROR: 'tbd',
      attributes: ['loadBlogError'],
      stateMutations: {
        loadingBlog: false,
        loadBlogError: action => action.loadBlogError,
      },
    },
    {
      UPDATE_BLOG: 'tbd',
      attributes: ['newBlog'],
      stateMutations: {
        updatingBlog: true,
        updateBlogError: null,
        newBlog: action => action.newBlog,
      },
    },
    {
      UPDATE_BLOG_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        updatingBlog: false,
        updateBlogSuccess: true,
      },
    },
    {
      UPDATE_BLOG_REGISTER_ERROR: 'tbd',
      attributes: ['updateBlogError'],
      stateMutations: {
        updatingBlog: false,
        updateBlogError: action => action.updateBlogError,
      },
    },
    {
      CREATE_BLOG: 'tbd',
      attributes: ['newBlog'],
      stateMutations: {
        creatingBlog: true,
        createBlogError: null,
        newBlog: action => action.newBlog,
      },
    },
    {
      CREATE_BLOG_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        creatingBlog: false,
        createBlogSuccess: true,
      },
    },
    {
      CREATE_BLOG_REGISTER_ERROR: 'tbd',
      attributes: ['createBlogError'],
      stateMutations: {
        creatingBlog: false,
        createBlogError: action => action.createBlogError,
      },
    },
  ],
};

export default actionMeta;

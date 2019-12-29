const actionMeta = {
  key: 'comments',
  actionDefinitions: [
    {
      LOAD_COMMENTS: 'tbd',
      attributes: ['currentPageId'],
      stateMutations: {
        currentPageId: action => action.currentPageId,
        loadingComments: true,
        loadCommentsError: null,
      },
    },
    {
      LOAD_COMMENTS_REGISTER_SUCCESS: 'tbd',
      attributes: ['comments'],
      stateMutations: {
        loadingComments: false,
        loadCommentsSuccess: true,
        comments: action => action.comments,
      },
    },
    {
      LOAD_COMMENTS_REGISTER_ERROR: 'tbd',
      attributes: ['loadCommentsError'],
      stateMutations: {
        loadingComments: false,
        loadCommentsSuccess: false,
        loadCommentsError: action => action.loadCommentsError,
      },
    },
    {
      CREATE_COMMENT: 'tbd',
      attributes: ['comment'],
      stateMutations: {
        comment: action => action.comment,
        creatingComment: true,
        createCommentError: null,
      },
    },
    {
      CREATE_COMMENT_REGISTER_SUCCESS: 'tbd',
      attributes: ['comment'],
      stateMutations: {
        creatingComment: false,
        createCommentSuccess: true,
        comment: action => action.comment,
      },
    },
    {
      CREATE_COMMENT_REGISTER_ERROR: 'tbd',
      attributes: ['createCommentError'],
      stateMutations: {
        creatingComment: false,
        createCommentSuccess: false,
        createCommentError: action => action.createCommentError,
      },
    },
    {
      UPDATE_COMMENT: 'tbd',
      attributes: ['comment'],
      stateMutations: {
        comment: action => action.comment,
        updatingComment: true,
        updateCommentError: null,
      },
    },
    {
      UPDATE_COMMENT_REGISTER_SUCCESS: 'tbd',
      attributes: ['comment'],
      stateMutations: {
        updatingComment: false,
        updateCommentSuccess: true,
        comment: action => action.comment,
      },
    },
    {
      UPDATE_COMMENT_REGISTER_ERROR: 'tbd',
      attributes: ['updateCommentError'],
      stateMutations: {
        updatingComment: false,
        updateCommentSuccess: false,
        updateCommentError: action => action.updateCommentError,
      },
    },
    {
      DELETE_COMMENT: 'tbd',
      attributes: ['comment'],
      stateMutations: {
        comment: action => action.comment,
        deletingComment: true,
        deleteCommentError: null,
      },
    },
    {
      DELETE_COMMENT_REGISTER_SUCCESS: 'tbd',
      attributes: ['comment'],
      stateMutations: {
        deletingComment: false,
        deleteCommentSuccess: true,
        comment: action => action.comment,
      },
    },
    {
      DELETE_COMMENT_REGISTER_ERROR: 'tbd',
      attributes: ['deleteCommentError'],
      stateMutations: {
        deletingComment: false,
        deleteCommentSuccess: false,
        deleteCommentError: action => action.deleteCommentError,
      },
    },
  ],
};

export default actionMeta;

const actionMeta = {
  key: 'usertoedit_edit',
  actionDefinitions: [
    {
      UPDATE_USERTOEDIT: 'tbd',
      attributes: ['newUsertoedit', 'onUpdateUsertoeditRegisterSuccess'],
      stateMutations: {
        updatingUsertoedit: true,
        updateUsertoeditError: null,
        newUsertoedit: action => action.newUsertoedit,
        onUpdateUsertoeditRegisterSuccess: action =>
          action.onUpdateUsertoeditRegisterSuccess,
      },
    },
    {
      UPDATE_USERTOEDIT_REGISTER_SUCCESS: 'tbd',
      attributes: [],
      stateMutations: {
        updatingUsertoedit: false,
        updateUsertoeditSuccess: true,
        onUpdateUsertoeditRegisterSuccess: null,
      },
    },
    {
      UPDATE_USERTOEDIT_REGISTER_ERROR: 'tbd',
      attributes: ['updateUsertoeditError'],
      stateMutations: {
        updatingUsertoedit: false,
        updateUsertoeditError: action => action.updateUsertoeditError,
        onUpdateUsertoeditRegisterSuccess: null,
      },
    },
  ],
};

export default actionMeta;

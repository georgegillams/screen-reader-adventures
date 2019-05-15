import { createSelector } from 'reselect';

const selectMessage = state => state.get('messages');

const makeSelectMessages = () =>
  createSelector(
    selectMessage,
    messageState => messageState.get('messages') || [],
  );

export { makeSelectMessages };

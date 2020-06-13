import { fromJS } from 'immutable';

import { PUSH_MESSAGE, PURGE_MESSAGES } from './constants';

const initialState = fromJS({
  messages: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_MESSAGE: {
      const currentMessages = state.get('messages');
      let duplicateMessage = null;
      if (currentMessages) {
        currentMessages.forEach(m => {
          if (m.message === action.message.message) {
            duplicateMessage = m;
          }
        });
      }
      const newMessage = action.message;
      return state.set('messages', [
        ...(currentMessages
          ? currentMessages.filter(m => m !== duplicateMessage)
          : []),
        newMessage,
      ]);
    }
    case PURGE_MESSAGES:
      return state.set(
        'messages',
        (state.get('messages') || []).filter(
          m => m.timestamp + 3500 > Date.now(),
        ),
      );
    default:
      return state;
  }
}

export default appReducer;

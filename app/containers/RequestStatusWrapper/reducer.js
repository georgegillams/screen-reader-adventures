import { fromJS } from 'immutable';

import { PUSH_MESSAGE, PURGE_MESSAGES } from './constants';

const initialState = fromJS({
  messages: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_MESSAGE:
      return state.set('messages', [
        ...(state.get('messages') || []),
        action.message,
      ]);
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

import { PUSH_MESSAGE, PURGE_MESSAGES } from './constants';

export function purgeMessages() {
  return {
    type: PURGE_MESSAGES,
  };
}

export function pushMessage(message) {
  return {
    type: PUSH_MESSAGE,
    message: { ...message, timestamp: Date.now() },
  };
}

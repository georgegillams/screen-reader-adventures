#!/usr/bin/env node

import { dbCreate } from 'utils/database';
import redis from 'utils/redis';
import appConfig from 'helpers/appConfig';

const clearDatabaseCollection = collectionName => {
  redis.del(`${appConfig.projectName}_${collectionName}`);
};

const createUsersWithSessions = () => {
  const user1 = {
    requestedId: 'adminUser1',
    name: 'Admin User One',
    uname: 'adminUser1',
    email: 'adminUser1@example.com',
    emailVerified: true,
    admin: true,
  };

  const user2 = {
    requestedId: 'nonAdminUser1',
    name: 'Non Admin User One',
    uname: 'nonAdminUser1',
    email: 'nonAdminUser1@example.com',
    emailVerified: true,
    admin: false,
  };

  const session1 = {
    sessionKey: 'adminSessionKey1',
    userId: 'adminUser1',
  };

  const session2 = {
    sessionKey: 'nonAdminSessionKey1',
    userId: 'nonAdminUser1',
  };

  return dbCreate({ redisKey: 'users' }, { body: user1 })
    .then(() => dbCreate({ redisKey: 'users' }, { body: user2 }))
    .then(() => dbCreate({ redisKey: 'sessions' }, { body: session1 }))
    .then(() => dbCreate({ redisKey: 'sessions' }, { body: session2 }));
};

export { clearDatabaseCollection, createUsersWithSessions };
export default { clearDatabaseCollection, createUsersWithSessions };

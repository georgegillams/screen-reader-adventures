import { datumCreate } from '../datum';

import grammarMLAllowedAttributes from './grammarMLAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  const reqSecured = reqSecure(req, grammarMLAllowedAttributes);
  return lockPromise(
    'grammarML',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            const { text } = reqSecured.body;
            const sentences = text
              .split('.')
              .join('.SPLIT_HERE')
              .split('?')
              .join('?SPLIT_HERE')
              .split('!')
              .join('!SPLIT_HERE')
              .split('SPLIT_HERE');

            const tasks = sentences
              .filter(
                s =>
                  s !== '' &&
                  (s.toLowerCase().includes('there') ||
                    s.toLowerCase().includes('their')),
              )
              .map(
                s =>
                  new Promise(res => {
                    datumCreate(
                      { redisKey: 'grammarML', user },
                      { body: { text: s.trim() } },
                    ).then(r => res(r));
                  }),
              );

            Promise.all(tasks).then(result => {
              resolve(result);
            });
          },
          err => reject(err),
        );
      }),
  );
}

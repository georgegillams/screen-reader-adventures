import apiStructure from './actions/common/apiStructureWithActions';

import { CategorisedError, InternalServerError, NotImplementedError } from 'server-utils/common/errors';
import { mapPathToAction } from 'server-utils/common/mapPathToAction.js';
import logger from 'server-utils/common/logger';

const appFunc = (req, res) => {
  const splitUrlPath = req.url.split('?')[0].split('/').slice(1);

  const pathMatches = mapPathToAction(apiStructure, splitUrlPath);
  const pathMatchesForMethod = pathMatches.filter(c => c.apiCapability.method === req.method);

  let action = null;
  let params = [];

  if (pathMatchesForMethod.length === 0 && pathMatches.length > 0) {
    res.status(405);
    res.json({
      error: 'method_not_allowed',
      errorMessage: `This API function cannot be called with HTTP method ${req.method}`,
    });
  }
  if (pathMatchesForMethod.length === 1) {
    action = pathMatchesForMethod[0].apiCapability.action;
    params = pathMatchesForMethod[0].params;
  }
  if (pathMatchesForMethod.length > 1) {
    const isError = new InternalServerError('Ambiguous request - the API has multiple functions matching the request');
    res.status(isError.httpStatus);
    res.json({
      error: isError.category,
      errorMessage: isError.message,
    });
  }

  try {
    if (action) {
      action(req, params)
        .then(result => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
          return true;
        })
        .catch(err => {
          if (err && err.redirect) {
            res.redirect(err.redirect);
          } else if (err instanceof CategorisedError) {
            res.status(err.httpStatus);
            res.json({ error: err.category, errorMessage: err.message });
          } else if (err instanceof Error) {
            // An error that we haven't created. Maybe created by redis or something
            logger.error(`Uncategorised error`, err);
            const internalServerError = new InternalServerError(err.message);
            res.status(internalServerError.httpStatus);
            res.json({
              error: internalServerError.category,
              errorMessage: internalServerError.message,
            });
          } else {
            // The error is an invalid object format, instead of being an instance of Error
            logger.error(`LEGACY ERROR - a promise rejected an object instead of an actual Error`, err);
            const internalServerError = new InternalServerError(err.message);
            res.status(internalServerError.httpStatus);
            res.json({
              error: internalServerError.category,
              errorMessage: internalServerError.message,
            });
          }
        });
    } else {
      const err = new NotImplementedError('This method has not been implemented');
      res.status(err.httpStatus);
      res.json({ error: err.category, errorMessage: err.message });
    }
  } catch (err) {
    logger.error(err);
  }
};

export default appFunc;

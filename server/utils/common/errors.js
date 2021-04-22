/* eslint-disable max-classes-per-file */

class CategorisedError extends Error {
  constructor(httpStatus = 404, category = 'simple', message = 'An error occurred', ...args) {
    super(message, ...args);
    this.category = category;
    this.httpStatus = httpStatus;
  }
}

class AuthError extends CategorisedError {
  constructor(message = '', ...args) {
    super(403, 'auth_error', message, ...args);
  }
}

class NetworkError extends CategorisedError {
  constructor(message = '', ...args) {
    super(503, 'network_error', message, ...args);
  }
}

class InvalidInputError extends CategorisedError {
  constructor(message = '', ...args) {
    super(403, 'invalid_input', message, ...args);
  }
}

class NotFoundError extends CategorisedError {
  constructor(message = '', ...args) {
    super(404, 'not_found', message, ...args);
  }
}

class InternalServerError extends CategorisedError {
  constructor(message = '', ...args) {
    super(500, 'internal_server_error', message, ...args);
  }
}

class NotImplementedError extends CategorisedError {
  constructor(message = '', ...args) {
    super(501, 'not_implemented', message, ...args);
  }
}

export {
  AuthError,
  CategorisedError,
  InternalServerError,
  InvalidInputError,
  NetworkError,
  NotFoundError,
  NotImplementedError,
};
export default {
  AuthError,
  CategorisedError,
  InternalServerError,
  InvalidInputError,
  NetworkError,
  NotFoundError,
  NotImplementedError,
};

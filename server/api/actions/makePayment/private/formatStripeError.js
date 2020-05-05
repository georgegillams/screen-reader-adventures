const formatStripeError = err => {
  let error = err;
  if (error.raw.message) {
    error = {
      error: 'network',
      errorMessage: error.raw.message,
    };
  }
  return error;
};

export default formatStripeError;

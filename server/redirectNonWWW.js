import { PROJECT_UNDER_TEST, NODE_ENV } from 'helpers/constants';

const redirectNonWWW = (req, res, next) => {
  if (NODE_ENV !== 'production' || PROJECT_UNDER_TEST) {
    next();
  } else {
    if (req.headers.host.match(/^www/) == null) {
      var newURL = 'https://www.' + req.headers.host + req.url;
      res.redirect(newURL);
    } else {
      next();
    }
  }
};

export default redirectNonWWW;

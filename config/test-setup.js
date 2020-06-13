// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

// Enzyme adapter for React 16
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Set up common env variables used for testing
process.env = Object.assign(process.env, {
  NODE_ENV: 'test',
  SECRET_API_KEY: 'secret_api_key',
});

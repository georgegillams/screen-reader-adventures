import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AuthenticatorIndex from '../index';
import Authenticator from '../Container';

describe('<Authenticator />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AuthenticatorIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Authenticator
          loadAuth={spy}
          authenticatorState={{
            ...initialState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

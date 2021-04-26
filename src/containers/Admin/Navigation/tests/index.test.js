import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AdminNavigationIndex from '../index';
import AdminNavigation from '../Container';

describe('<AdminNavigation />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNavigationIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNavigation
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with user', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNavigation
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin user', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNavigation
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName', admin: true },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with auth error', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNavigation
          authenticatorState={{
            ...initialAuthenticatorState,
            loadAuthError: { error: 'error_type', errorMessage: 'Some error' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

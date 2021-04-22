import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AccountIndex from '../index';
import Account from '../Container';

describe('<Account />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AccountIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with logOutError', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
            logOutError: { error: 'not_found', errorMessage: 'Invalid session' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with logOutResult', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
            logOutResult: { success: 'logged out' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loggingOut=true', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
            loggingOut: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with requestingVerificationEmail=true', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
            requestingVerificationEmail: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with requestVerificationEmailResult', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
            requestVerificationEmailResult: { success: 'Verification email sent' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with requestVerificationEmailError', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
            requestVerificationEmailError: { error: 'not_found', errorMessage: 'Invalid session' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with user with emailVerified=true', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName', emailVerified: true },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with no user', () => {
    const { container } = render(
      <Provider store={store}>
        <Account
          logout={spy}
          requestVerificationEmail={spy}
          accountState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import EmailVerificationIndex from '../index';
import EmailVerification from '../Container';

describe('<EmailVerification />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <EmailVerificationIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <EmailVerification
          verify={spy}
          verificationState={{
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

  it('should render correctly with verifying=true', () => {
    const { container } = render(
      <Provider store={store}>
        <EmailVerification
          verify={spy}
          verificationState={{
            ...initialState,
            verifying: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with verifyError', () => {
    const { container } = render(
      <Provider store={store}>
        <EmailVerification
          verify={spy}
          verificationState={{
            ...initialState,
            verifyError: { error: 'not_found', errorMessage: 'Invalid verification link' },
          }}
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
        <EmailVerification
          verify={spy}
          verificationState={{
            ...initialState,
            verifyResult: { success: 'Email verified' },
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
});

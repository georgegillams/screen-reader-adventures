import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState as initialConsentState } from '../../Consent/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import MagicLoginIndex from '../index';
import MagicLogin from '../Container';
import { CONSENT_STATE_ALLOWED } from 'containers/common/Consent/constants';

describe('<MagicLogin />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLoginIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
          consentState={{ ...initialConsentState }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loggingIn=true', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
            loggingIn: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
          consentState={{ ...initialConsentState, cookieConsent: CONSENT_STATE_ALLOWED }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with logInError', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
            logInError: { error: 'not_found', errorMessage: 'Invalid session' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
          consentState={{ ...initialConsentState, cookieConsent: CONSENT_STATE_ALLOWED }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with user', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
            logInResult: { success: 'logged in' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
          consentState={{ ...initialConsentState, cookieConsent: CONSENT_STATE_ALLOWED }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

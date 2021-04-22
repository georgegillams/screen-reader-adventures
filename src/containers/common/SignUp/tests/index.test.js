import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';
import { initialState as initialConsentState } from '../../Consent/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import SignUpIndex from '../index';
import SignUp from '../Container';
import { CONSENT_STATE_ALLOWED } from 'containers/common/Consent/constants';

describe('<SignUp />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <SignUpIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <SignUp
          signUp={spy}
          signUpState={{
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

  it('should render correctly with signUpError', () => {
    const { container } = render(
      <Provider store={store}>
        <SignUp
          signUp={spy}
          signUpState={{
            ...initialState,
            signUpError: { error: 'not_found', errorMessage: 'No matching email found' },
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

  it('should render correctly with signUpResult', () => {
    const { container } = render(
      <Provider store={store}>
        <SignUp
          signUp={spy}
          signUpState={{
            ...initialState,
            signUpResult: { uname: 'uname', email: 'email' },
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

  it('should render correctly with signingUp=true', () => {
    const { container } = render(
      <Provider store={store}>
        <SignUp
          signUp={spy}
          signUpState={{
            ...initialState,
            signingUp: true,
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
        <SignUp
          signUp={spy}
          signUpState={{
            ...initialState,
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

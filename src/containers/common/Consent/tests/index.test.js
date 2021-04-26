import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import ConsentIndex from '../index';
import Consent from '../Container';
import { CONSENT_STATE_ALLOWED, CONSENT_STATE_DEFERRED } from '../constants';

describe('<Consent />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <ConsentIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Consent
          consent={spy}
          resetConsent={spy}
          deferConsent={spy}
          consentState={{
            ...initialState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with consent allowed', () => {
    const { container } = render(
      <Provider store={store}>
        <Consent
          consent={spy}
          resetConsent={spy}
          deferConsent={spy}
          consentState={{
            ...initialState,
            cookieConsent: CONSENT_STATE_ALLOWED,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with consent deferred', () => {
    const { container } = render(
      <Provider store={store}>
        <Consent
          consent={spy}
          resetConsent={spy}
          deferConsent={spy}
          consentState={{
            ...initialState,
            cookieConsent: CONSENT_STATE_DEFERRED,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with consent deferred and reason', () => {
    const { container } = render(
      <Provider store={store}>
        <Consent
          consent={spy}
          resetConsent={spy}
          deferConsent={spy}
          consentState={{
            ...initialState,
            cookieConsent: CONSENT_STATE_DEFERRED,
            cookieConsentReason: 'log in',
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

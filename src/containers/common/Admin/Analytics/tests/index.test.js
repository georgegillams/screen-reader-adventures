import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AdminAnalyticsIndex from '../index';
import AdminAnalytics from '../Container';

describe('<AdminAnalytics />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalyticsIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalytics
          load={spy}
          resend={spy}
          adminAnalyticsState={{
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

  it('should render correctly with user', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalytics
          load={spy}
          resend={spy}
          adminAnalyticsState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'testUser' },
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with admin user', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalytics
          load={spy}
          resend={spy}
          adminAnalyticsState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'testUser', admin: true },
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loading=true', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalytics
          load={spy}
          resend={spy}
          adminAnalyticsState={{
            ...initialState,
            loading: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'testUser', admin: true },
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loadError', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalytics
          load={spy}
          resend={spy}
          adminAnalyticsState={{
            ...initialState,
            loadError: { error: 'some_error', errorMessage: 'Something went wrong' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'testUser', admin: true },
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with analytics', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminAnalytics
          load={spy}
          resend={spy}
          adminAnalyticsState={{
            ...initialState,
            emails: [
              { id: '1', url: 'url1', count: 1 },
              { id: '2', url: 'url2', count: 2 },
              { id: '3', url: 'url3', count: 3 },
            ],
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'testUser', admin: true },
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

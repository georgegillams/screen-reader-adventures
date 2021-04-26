import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AdminNotificationsIndex from '../index';
import AdminNotifications from '../Container';

describe('<AdminNotifications />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNotificationsIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNotifications
          load={spy}
          resend={spy}
          notificationsState={{
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
        <AdminNotifications
          load={spy}
          resend={spy}
          notificationsState={{
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
        <AdminNotifications
          load={spy}
          resend={spy}
          notificationsState={{
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
        <AdminNotifications
          load={spy}
          resend={spy}
          notificationsState={{
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
        <AdminNotifications
          load={spy}
          resend={spy}
          notificationsState={{
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

  it('should render correctly with notifications', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminNotifications
          load={spy}
          resend={spy}
          notificationsState={{
            ...initialState,
            notifications: [
              { id: '1', message: 'message1', type: 'success' },
              { id: '2', message: 'message2', type: 'warn' },
              { id: '3', message: 'message3', type: 'error' },
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

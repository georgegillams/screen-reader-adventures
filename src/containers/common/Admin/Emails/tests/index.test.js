import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AdminUsersIndex from '../index';
import AdminEmails from '../Container';

describe('<AdminEmails />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsersIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
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
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
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
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
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
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
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
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
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

  it('should render correctly with emails', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
            ...initialState,
            emails: [
              { id: '1', to: 'to1', from: 'from1', text: 'test@example.com', html: '<div>TEST</div>' },
              { id: '2', to: 'to2', from: 'from2', text: 'another@example.com', html: '<div>TEST</div>' },
              { id: '3', to: 'to3', from: 'from3', text: 'three@example.com', html: '<div>TEST</div>' },
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

  it('should render correctly with resending=true', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
            ...initialState,
            resending: true,
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

  it('should render correctly with resendError', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminEmails
          load={spy}
          resend={spy}
          adminEmailsState={{
            ...initialState,
            resendError: { error: 'some_error', errorMessage: 'Something went wrong' },
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

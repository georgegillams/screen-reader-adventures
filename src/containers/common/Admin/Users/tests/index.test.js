import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import AdminUsersIndex from '../index';
import AdminUsers from '../Container';

describe('<AdminUsers />', () => {
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
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
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
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
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
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
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
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
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
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
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

  it('should render correctly with users', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            users: [
              { id: '1', name: 'name', email: 'test@example.com' },
              { id: '2', name: 'another', email: 'another@example.com' },
              { id: '3', name: 'a third', email: 'three@example.com' },
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

  it('should render correctly with requesting=true', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            requesting: true,
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

  it('should render correctly with requestError', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            requestError: { error: 'some_error', errorMessage: 'Something went wrong' },
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

  it('should render correctly with removing=true', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            removing: true,
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

  it('should render correctly with removeError', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            removeError: { error: 'some_error', errorMessage: 'Something went wrong' },
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

  it('should render correctly with creating=true', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            creating: true,
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

  it('should render correctly with createError', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            createError: { error: 'some_error', errorMessage: 'Something went wrong' },
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

  it('should render correctly with updating=true', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            updating: true,
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

  it('should render correctly with updateError', () => {
    const { container } = render(
      <Provider store={store}>
        <AdminUsers
          load={spy}
          remove={spy}
          requestMagicLink={spy}
          create={spy}
          update={spy}
          adminUsersState={{
            ...initialState,
            updateError: { error: 'some_error', errorMessage: 'Something went wrong' },
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

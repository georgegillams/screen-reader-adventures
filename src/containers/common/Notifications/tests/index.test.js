import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from 'containers/common/Admin/Notifications/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import NotificationsIndex from '../index';
import Notifications from '../Container';

describe('<Notifications />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <NotificationsIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <Notifications
          load={spy}
          notificationsState={{
            ...initialState,
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with user', () => {
    const { container } = render(
      <Provider store={store}>
        <Notifications
          load={spy}
          notificationsState={{
            ...initialState,
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loading=true', () => {
    const { container } = render(
      <Provider store={store}>
        <Notifications
          load={spy}
          notificationsState={{
            ...initialState,
            loading: true,
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loadError', () => {
    const { container } = render(
      <Provider store={store}>
        <Notifications
          load={spy}
          notificationsState={{
            ...initialState,
            loadError: { error: 'some_error', errorMessage: 'Something went wrong' },
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with notifications', () => {
    const { container } = render(
      <Provider store={store}>
        <Notifications
          load={spy}
          notificationsState={{
            ...initialState,
            notifications: [
              { id: '1', message: 'message1', type: 'success' },
              { id: '2', message: 'message2', type: 'warn' },
              { id: '3', message: 'message3', type: 'error' },
            ],
          }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

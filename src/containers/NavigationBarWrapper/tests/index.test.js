import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import NavigationBarWrapperIndex from '../index';
import NavigationBarWrapper from '../Container';

describe('<Authenticator />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <NavigationBarWrapperIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with default state', () => {
    const { container } = render(
      <Provider store={store}>
        <NavigationBarWrapper
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
        <NavigationBarWrapper
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with null user', () => {
    const { container } = render(
      <Provider store={store}>
        <NavigationBarWrapper
          authenticatorState={{
            ...initialAuthenticatorState,
            user: null,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

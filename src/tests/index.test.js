import React from 'react';
// import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'client-utils/common/redux/configure-store';

import IndexPage from '../pages/index';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly', () => {
    let props;

    // If the page defines `getInitialProps` we should call them here
    // act(() => {
    //   props = IndexPage.getInitialProps();
    // });

    const { container } = render(
      <Provider store={store}>
        <IndexPage {...props} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

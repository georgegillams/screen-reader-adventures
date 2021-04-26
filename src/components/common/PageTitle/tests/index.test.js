import React from 'react';

import { render } from '@testing-library/react';

import PageTitle from '..';

describe('<PageTitle />', () => {
  const children = 'some text';

  it('Should render correctly', () => {
    const { container } = render(<PageTitle name="Test">{children}</PageTitle>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(
      <PageTitle name="Test" className={'test-custom-classname'}>
        {children}
      </PageTitle>
    );

    expect(container).toMatchSnapshot();
  });
  // This test is failing - revisit
  it('Should render correctly with other props', () => {
    const { container } = render(
      <PageTitle name="Test" pageTitle="Different" link={{ to: '/test', text: 'test' }}>
        {children}
      </PageTitle>
    );

    expect(container).toMatchSnapshot();
  });
});

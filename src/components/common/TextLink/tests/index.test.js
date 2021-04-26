import React from 'react';

import { render } from '@testing-library/react';

import TextLink from '..';

describe('<TextLink />', () => {
  const children = 'some text';

  it('Should render correctly', () => {
    const { container } = render(<TextLink href="/test">{children}</TextLink>);

    expect(container).toMatchSnapshot();
  });

  it('Should render with nextified href', () => {
    const { container } = render(<TextLink href="/blog/test">{children}</TextLink>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(
      <TextLink href="/test" className={'test-custom-classname'}>
        {children}
      </TextLink>
    );

    expect(container).toMatchSnapshot();
  });
  // This test was causing jest to hang. Reinstate if possible
  // it('Should render correctly with hrefExternal', () => {
  //   const { container } = render(
  //     <TextLink href="/test" hrefExternal>
  //       {children}
  //     </TextLink>
  //   );

  //   expect(container).toMatchSnapshot();
  // });
});

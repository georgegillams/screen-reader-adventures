import React from 'react';

import { render } from '@testing-library/react';

import LegacyPageContainer, { LAYOUT_STYLES } from '..';

describe('<LegacyPageContainer />', () => {
  const children = <div>some text</div>;

  it('Should render correctly', () => {
    const { container } = render(<LegacyPageContainer>{children}</LegacyPageContainer>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(
      <LegacyPageContainer className={'test-custom-classname'}>{children}</LegacyPageContainer>
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with prose', () => {
    const { container } = render(<LegacyPageContainer layout={LAYOUT_STYLES.prose}>{children}</LegacyPageContainer>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with defaultCenter', () => {
    const { container } = render(
      <LegacyPageContainer layout={LAYOUT_STYLES.defaultCenter}>{children}</LegacyPageContainer>
    );

    expect(container).toMatchSnapshot();
  });
});

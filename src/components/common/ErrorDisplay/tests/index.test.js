import React from 'react';

import { render } from '@testing-library/react';

import ErrorDisplay from '..';

describe('<ErrorDisplay  />', () => {
  it('Should render correctly', () => {
    const { container } = render(<ErrorDisplay />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with message', () => {
    const { container } = render(<ErrorDisplay message="Test message" />);

    expect(container).toMatchSnapshot();
  });

  it('Should render with empty error object and message', () => {
    const { container } = render(<ErrorDisplay message="Test message" error={{}} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render with well-defined error object and message', () => {
    const { container } = render(
      <ErrorDisplay message="Test message" error={{ errorMessage: 'Test error message' }} />
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render with empty error object and no message', () => {
    const { container } = render(<ErrorDisplay error={{}} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render with well-defined error object and no message', () => {
    const { container } = render(<ErrorDisplay error={{ errorMessage: 'Test error message' }} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with children', () => {
    const { container } = render(<ErrorDisplay message="Test message">TEST CHILD</ErrorDisplay>);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with custom className', () => {
    const { container } = render(<ErrorDisplay message="Test message" className={'test-custom-classname'} />);

    expect(container).toMatchSnapshot();
  });
});

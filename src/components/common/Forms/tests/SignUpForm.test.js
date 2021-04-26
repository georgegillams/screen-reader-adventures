import React from 'react';
import { render } from '@testing-library/react';

import { SignUpForm } from '..';

describe('<SignUpForm />', () => {
  it('Should render correctly', () => {
    const { container } = render(<SignUpForm credentials={{}} onDataChanged={() => null} onSubmit={() => null} />);

    expect(container).toMatchSnapshot();
  });
});

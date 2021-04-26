import React from 'react';
import { render } from '@testing-library/react';

import ApiDocs from '../Container';

describe('<ApiDocs />', () => {
  it('should render correctly', () => {
    const { container } = render(<ApiDocs />);

    expect(container).toMatchSnapshot();
  });
});

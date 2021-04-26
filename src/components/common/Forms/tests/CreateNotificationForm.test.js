import React from 'react';
import { render } from '@testing-library/react';

import { CreateNotificationForm } from '..';

describe('<CreateNotificationForm />', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <CreateNotificationForm notification={{ type: 'success' }} onDataChanged={() => null} onSubmit={() => null} />
    );

    expect(container).toMatchSnapshot();
  });
});

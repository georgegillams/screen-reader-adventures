import React from 'react';
import { render } from '@testing-library/react';

import Status from '../Container';

const testAppConfig = {
  githubRepo: 'GITHUB_REPO',
  githubRepoUrl: 'GITHUB_REPO_URL',
};

describe('<Status />', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Status appConfig={testAppConfig} startedAt={12375223} builtAt={12355123} nodeEnv="test-node-env" />
    );

    expect(container).toMatchSnapshot();
  });
});

import React from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Paragraph, SubSection, PageTitle } from 'gg-components/Typography';

import STYLES from '../pages.scss';

import { getTimeDifference } from 'helpers/time';

const getClassName = cssModules(STYLES);

const Status = props => (
  <div {...props}>
    <Helmet title="Status" />
    <PageTitle anchor={false} name="Status">
      <img
        className={getClassName('pages__component')}
        alt="Build status"
        src="https://github.com/georgegillams/georgegillams.co.uk/workflows/CI/badge.svg"
      />
      <br />
      <img
        className={getClassName('pages__component')}
        alt="Dependency status"
        src="https://img.shields.io/david/georgegillams/georgegillams.co.uk"
      />
      <SubSection className={getClassName('pages__component')} anchor={false}>
        <Paragraph>
          Built {getTimeDifference(new Date(process.env.BUILT_AT * 1000))}
        </Paragraph>
      </SubSection>
    </PageTitle>
  </div>
);

export default Status;

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';
import { getTimeDifference } from 'helpers/time';

import STYLES from '../pages.scss';

import { Paragraph, Section, SubSection, PageTitle } from 'gg-components/Typography';
const getClassName = cssModules(STYLES);

const Status = props => {
  return (
    <div {...props}>
      <Helmet title="Status" />
      <PageTitle anchor={false} name="Status">
        <img
          className={getClassName('pages__component')}
          alt="Build status"
          src="https://api.travis-ci.org/georgegillams/georgegillams.co.uk.svg?branch=master"
        />
        <br />
        <img
          className={getClassName('pages__component')}
          alt="Greenkeeper status"
          src="https://badges.greenkeeper.io/georgegillams/georgegillams.co.uk.svg"
        />
        <SubSection className={getClassName('pages__component')} anchor={false}>
          <Paragraph>
            Built {getTimeDifference(new Date(process.env.BUILT_AT * 1000))}
          </Paragraph>
        </SubSection>
      </PageTitle>
      <Section anchor={false} name="gg-components">
        <img
          className={getClassName('pages__component')}
          alt="Build status"
          src="https://api.travis-ci.org/georgegillams/gg-components.svg?branch=master"
        />
        <br />
        <img
          className={getClassName('pages__component')}
          alt="Greenkeeper status"
          src="https://badges.greenkeeper.io/georgegillams/gg-components.svg"
        />
      </Section>
    </div>
  );
};

export default Status;

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Subsection } from 'gg-components/Subsection';
import { Paragraph } from 'gg-components/Paragraph';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'gg-components/DebugObject';

import STYLES from './style.scss';

import { getTimeDifference } from 'helpers/common/time';

const getClassName = cssModules(STYLES);

const Status = props => {
  const { appConfig, startedAt, builtAt, nodeEnv, ...rest } = props;

  return (
    <div {...rest}>
      <PageTitle anchor={false} name="Status">
        <img
          className={getClassName('style__component')}
          alt="Build status"
          src={`${appConfig.githubRepoUrl}/workflows/CI/badge.svg`}
        />
        <br />
        <img
          className={getClassName('style__component')}
          alt="Dependency status"
          src={`https://img.shields.io/david/${appConfig.githubRepo}`}
        />
        <Subsection className={getClassName('pages__component')} anchor={false}>
          <Paragraph>
            Built {getTimeDifference(new Date(builtAt * 1000))}
            <br />
            Started {getTimeDifference(new Date(startedAt * 1000))}
          </Paragraph>
        </Subsection>
        <Subsection className={getClassName('pages__component')} anchor={false}>
          <Paragraph>Environment {nodeEnv}</Paragraph>
        </Subsection>
        <Subsection className={getClassName('pages__component')} anchor={false}>
          <DebugObject debugObject={appConfig} debugTitle="App config"></DebugObject>
        </Subsection>
      </PageTitle>
    </div>
  );
};

Status.propTypes = {
  appConfig: PropTypes.object.isRequired,
  startedAt: PropTypes.number.isRequired,
  builtAt: PropTypes.number.isRequired,
  nodeEnv: PropTypes.string.isRequired,
};

export default Status;

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import { cssModules } from 'bpk-react-utils';

import STYLES from './level-wrapper.scss';

const getClassName = cssModules(STYLES);

export default class LevelWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { levelComplete: false };
  }

  render() {
    const { levelNumber, description, level, ...rest } = this.props;

    const levelClone = React.cloneElement(level, {
      onLevelComplete: () => {
        this.setState({ levelComplete: true });
      },
      className: getClassName('level-wrapper__level'),
    });

    return (
      <Section
        name={`Level ${levelNumber}`}
        className={getClassName('level-wrapper__outer')}
        {...rest}
      >
        <Helmet title={`Level ${levelNumber}`} />
        <span className={getClassName('level-wrapper__description')}>
          {description}
        </span>
        {levelClone}
        <GGButton
          large
          disabled={!this.state.levelComplete}
          href={`/level/${levelNumber + 1}`}
        >
          Continue to level {levelNumber + 1}
        </GGButton>
      </Section>
    );
  }
}

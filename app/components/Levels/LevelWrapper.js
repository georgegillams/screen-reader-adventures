import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Helmet } from 'react-helmet';
import { Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import { cssModules } from 'bpk-react-utils';

import Character from './Character';
import STYLES from './level-wrapper.scss';

const getClassName = cssModules(STYLES);

export default class LevelWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { levelComplete: false, characterPos: { left: 0, top: 0 } };
    this.character = React.createRef();
  }

  summonCharacter = sender => {
    // TODO Move to next square one at a time.
    // TODO On each square, call `onVisit`
    // TODO Add game logic to determine if the character can move.
    // TODO Also to determine if character has one, or died
    const newPos = {};
    const square = findDOMNode(sender.current);
    const squarePos = square.getBoundingClientRect();
    newPos.left = squarePos.left;
    newPos.top = squarePos.top;
    this.setState({ characterPos: newPos });
  };

  render() {
    const { levelNumber, description, level, ...rest } = this.props;

    const levelClone = React.cloneElement(level, {
      onLevelComplete: () => {
        this.setState({ levelComplete: true });
      },
      className: getClassName('level-wrapper__level'),
      summonCharacter: this.summonCharacter,
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
        <Character ref={this.character} style={this.state.characterPos} />
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

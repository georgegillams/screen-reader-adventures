import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Helmet } from 'react-helmet';
import { Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import { OpenSpace, Space, GoalSpace, BlankSpace } from 'components/Levels';
import { cssModules } from 'bpk-react-utils';

import Character from './Character';
import STYLES from './level-wrapper.scss';

const getClassName = cssModules(STYLES);

export default class LevelWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelComplete: false,
      characterGamePos: { x: 0, y: 0 },
      characterPos: { left: 0, top: 0 },
    };
    this.character = React.createRef();
    this.spaceRefs = {};
  }

  onLevelComplete = () => {
    this.setState({ levelComplete: true });
  };

  componentDidMount = () => {
    const { startSpace } = this.props;
    if (!startSpace) {
      return;
    }

    const { x, y } = startSpace;
    this.setState({ characterGamePos: startSpace });
    if (
      this.spaceRefs &&
      this.spaceRefs[`row_${x}`] &&
      this.spaceRefs[`row_${x}`][`col_${y}`]
    ) {
      const ref = this.spaceRefs[`row_${x}`][`col_${y}`];
      this.moveCharacter(ref);
    }
  };

  summonCharacter = (x, y, sender) => {
    const { characterGamePos } = this.state;
    // Only permit moving in straight lines
    if (x !== characterGamePos.x && y !== characterGamePos.y) {
      return;
    }
    // TODO Move to next square one at a time, instead of jumping.
    // TODO On each square, call `onVisit`
    // TODO `OnVisit` should determine whether the character has won, or died
    this.moveCharacter(sender);
    if (sender.current.props.onVisit) {
      sender.current.props.onVisit();
    }
    this.setState({ characterGamePos: { x, y } });
  };

  moveCharacter = sender => {
    const newPos = {};
    const square = findDOMNode(sender.current);
    newPos.left = square.offsetLeft;
    newPos.top = square.offsetTop;
    this.setState({ characterPos: newPos });
  };

  createSpaceRef = (i, j) => {
    const newRef = React.createRef();
    const rowRefs = this.spaceRefs[`row_${i}`];
    if (!rowRefs) {
      this.spaceRefs[`row_${i}`] = {};
    }
    this.spaceRefs[`row_${i}`][`col_${j}`] = newRef;
    return newRef;
  };

  render() {
    const { startSpace, levelNumber, description, level, ...rest } = this.props;

    let spaceNumber = 0;

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
        <div className={getClassName('level-wrapper__level')}>
          <Character ref={this.character} style={this.state.characterPos} />
          {level.map((row, i) => (
            <div className={getClassName('level-wrapper__row')}>
              {row.map((spaceTypeId, j) => {
                const spaceRef = this.createSpaceRef(i, j);
                if (spaceTypeId === 'a') {
                  spaceNumber += 1;
                  return (
                    <Space
                      spaceNumber={spaceNumber}
                      ref={spaceRef}
                      onClick={() => this.summonCharacter(i, j, spaceRef)}
                    />
                  );
                }
                if (spaceTypeId === 's') {
                  return (
                    <OpenSpace
                      spaceNumber={spaceNumber}
                      ref={spaceRef}
                      onClick={() => this.summonCharacter(i, j, spaceRef)}
                    />
                  );
                }
                if (spaceTypeId === 'b') {
                  return <BlankSpace spaceNumber={spaceNumber} />;
                }
                if (spaceTypeId === 'g') {
                  spaceNumber += 1;
                  return (
                    <GoalSpace
                      spaceNumber={spaceNumber}
                      onVisit={() => this.onLevelComplete()}
                      ref={spaceRef}
                      onClick={() => this.summonCharacter(i, j, spaceRef)}
                    />
                  );
                }
              })}
              <br />
            </div>
          ))}
        </div>
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

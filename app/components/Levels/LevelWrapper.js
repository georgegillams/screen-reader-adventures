import React, { Fragment, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Helmet } from 'react-helmet';
import { Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import UntappableScrim from 'components/Scrim';
import { OpenSpace, Space, GoalSpace, BlankSpace } from 'components/Levels';
import { MONSTER_MOVING_SPEED } from 'helpers/constants';
import { cssModules } from 'bpk-react-utils';

import Character from './Character';
import Monster from './Monster';
import STYLES from './level-wrapper.scss';

const getClassName = cssModules(STYLES);

export default class LevelWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelComplete: false,
      monsterGamePos: [],
      characterGamePos: { x: 0, y: 0 },
      targetCharacterGamePos: { x: 0, y: 0 },
      characterIsMoving: false,
    };
    this.character = React.createRef();
    this.spaceRefs = this.createSpaceRefs(props.level);
    this.monsterRefs = this.createMonsterRefs(props.monsterPositions);
  }

  createSpaceRefs = level => {
    const result = {};
    level.forEach((row, i) => {
      row.forEach((spaceTypeId, j) => {
        if (spaceTypeId === 'a' || spaceTypeId === 'g' || spaceTypeId === 's') {
          this.create3DRef(i, j, result);
        }
      });
    });
    return result;
  };

  createMonsterRefs = monsterPositions => {
    const result = {};
    monsterPositions.forEach(mP => {
      this.create3DRef(mP.x, mP.y, result);
    });
    return result;
  };

  onLevelComplete = () => {
    this.setState({ levelComplete: true });
  };

  componentDidMount = () => {
    const { startSpace, monsterPositions } = this.props;

    this.setState({
      characterGamePos: startSpace || { x: 0, y: 0 },
      monsterGamePos: monsterPositions || [],
    });
  };

  getSquareOnScreen = (x, y) => {
    return this.get3DEntityOnScreen(x, y, this.spaceRefs);
  };

  getMonsterOnScreen = (x, y) => {
    return this.get3DEntityOnScreen(x, y, this.monsterRefs);
  };

  get3DEntityOnScreen = (x, y, references) => {
    if (
      references &&
      references[`row_${x}`] &&
      references[`row_${x}`][`col_${y}`]
    ) {
      const ref = references[`row_${x}`][`col_${y}`];
      if (ref && ref.current) {
        return ref;
      }
    }

    return null;
  };

  moveCharacter = (xOverride, yOverride) => {
    const { characterGamePos, targetCharacterGamePos } = this.state;
    let { x, y } = targetCharacterGamePos;
    if (xOverride !== undefined && yOverride !== undefined) {
      x = xOverride;
      y = yOverride;
    }
    let currentX = characterGamePos.x;
    let currentY = characterGamePos.y;

    // If no movement is required, don't do anything
    if (x === currentX && y === currentY) {
      this.setState({ characterIsMoving: false });
      return;
    }

    const movingXForwards = currentX < x;
    const movingXBackwards = currentX > x;
    const movingYForwards = currentY < y;
    const movingYBackwards = currentY > y;
    const movingXWards = movingXForwards || movingXBackwards;
    const movingYWards = movingYForwards || movingYBackwards;

    // We only permit moving in straight lines
    if (movingXWards && movingYWards) {
      this.setState({ characterIsMoving: false });
      return;
    }

    // Move the character one space
    currentX += movingXForwards ? 1 : 0;
    currentX -= movingXBackwards ? 1 : 0;
    currentY += movingYForwards ? 1 : 0;
    currentY -= movingYBackwards ? 1 : 0;

    const square = this.getSquareOnScreen(currentX, currentY);
    debugger;

    if (square) {
      if (square.current.props.onVisit) {
        square.current.props.onVisit();
      }
      this.state.monsterGamePos.forEach(mP => {
        if (mP.x === currentX && mP.y === currentY) {
          this.setState({ gameOver: true });
        }
      });
    }

    this.setState({
      characterIsMoving: true,
      characterGamePos: { x: currentX, y: currentY },
    });

    // Recursively call the moving function to continue character movement
    setTimeout(() => {
      this.moveCharacter();
    }, MONSTER_MOVING_SPEED * 1000);
  };

  summonCharacter = (x, y) => {
    this.setState({ targetCharacterGamePos: { x, y } });
    if (!this.state.characterIsMoving) {
      this.moveCharacter(x, y);
    }
  };

  getCharacterScreenPosition = () => {
    const characterPosition = this.state.characterGamePos;
    if (!characterPosition) {
      return;
    }
    const result = {};
    const squareRef = this.getSquareOnScreen(
      characterPosition.x,
      characterPosition.y,
    );
    if (!squareRef) {
      return;
    }
    const square = findDOMNode(squareRef.current);
    result.left = square.offsetLeft;
    result.top = square.offsetTop;
    return result;
  };

  getMonsterScreenPosition = monsterNumber => {
    const monsterPosition = this.state.monsterGamePos[monsterNumber];
    if (!monsterPosition) {
      return;
    }
    const result = {};
    const squareRef = this.getSquareOnScreen(
      monsterPosition.x,
      monsterPosition.y,
    );
    if (!squareRef) {
      return;
    }
    const square = findDOMNode(squareRef.current);
    result.left = square.offsetLeft;
    result.top = square.offsetTop;
    return result;
  };

  // TODO Avoid creating refs on everysingle render - it is innefficient!
  // Refs should be created for spaces and monsters in the constructor
  // createSpaceRef = (i, j) => {
  //   return this.create3DRef(i, j, this.spaceRefs);
  // };

  // createMonsterRef = (i, j) => {
  //   return this.create3DRef(i, j, this.monsterRefs);
  // };

  create3DRef = (i, j, currentRefs) => {
    const newRef = React.createRef();
    const rowRefs = currentRefs[`row_${i}`];
    if (!rowRefs) {
      currentRefs[`row_${i}`] = {};
    }
    currentRefs[`row_${i}`][`col_${j}`] = newRef;
    return newRef;
  };

  render() {
    debugger;
    const {
      startSpace,
      levelNumber,
      description,
      monsterPositions,
      level,
      ...rest
    } = this.props;

    let spaceNumber = 0;

    if (this.state.gameOver) {
      return <Section noAnchor name="GAME OVER" />;
    }

    return (
      <Section
        name={`Level ${levelNumber}`}
        className={getClassName('level-wrapper__outer')}
        {...rest}
      >
        <Helmet title={`Level ${levelNumber}`} />
        <UntappableScrim />
        <span className={getClassName('level-wrapper__description')}>
          {description}
        </span>
        <div className={getClassName('level-wrapper__level')}>
          <Character
            ref={this.character}
            style={this.getCharacterScreenPosition()}
          />
          {monsterPositions.map((mP, i) => {
            return (
              <Monster
                ref={this.getMonsterOnScreen(mP.x, mP.y)}
                style={this.getMonsterScreenPosition(i)}
              />
            );
          })}
          {level.map((row, i) => (
            <div className={getClassName('level-wrapper__row')}>
              {row.map((spaceTypeId, j) => {
                if (spaceTypeId === 'a') {
                  spaceNumber += 1;
                  return (
                    <Space
                      spaceNumber={spaceNumber}
                      ref={this.getSquareOnScreen(i, j)}
                      onClick={() => this.summonCharacter(i, j)}
                    />
                  );
                }
                if (spaceTypeId === 's') {
                  return (
                    <OpenSpace
                      spaceNumber={spaceNumber}
                      ref={this.getSquareOnScreen(i, j)}
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
                      ref={this.getSquareOnScreen(i, j)}
                      onClick={() => this.summonCharacter(i, j)}
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

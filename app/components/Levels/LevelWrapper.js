import React, { Fragment, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Helmet } from 'react-helmet';
import { Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import UntappableScrim from 'components/Scrim';
import { OpenSpace, Space, GoalSpace, BlankSpace } from 'components/Levels';
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
      monsterPos: [],
      characterGamePos: { x: 0, y: 0 },
      characterPos: { left: 0, top: 0 },
    };
    this.character = React.createRef();
    this.spaceRefs = {};
    this.monsterRefs = {};
  }

  onLevelComplete = () => {
    this.setState({ levelComplete: true });
  };

  componentDidMount = () => {
    const { startSpace, monsterPositions } = this.props;
    if (!startSpace) {
      return;
    }

    this.setState({
      characterGamePos: startSpace,
      monsterGamePos: monsterPositions || [],
    });

    const { x, y } = startSpace;
    const ref = this.getSquare(x, y);
    if (ref) {
      this.moveCharacter(ref);
    }

    monsterPositions.forEach((monsterGamePos, i) => {
      const squareRef = this.getSquare(monsterGamePos.x, monsterGamePos.y);
      if (squareRef) {
        this.moveMonster(squareRef, i);
      }
    });
  };

  getSquare = (x, y) => {
    return this.get3DEntity(x, y, this.spaceRefs);
  };

  getMonster = (x, y) => {
    return this.get3DEntity(x, y, this.monsterRefs);
  };

  get3DEntity = (x, y, references) => {
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

  addMonster = (x, y) => {
    let monsterAlreadyRegistered = false;
    const monsterGamePositions = JSON.parse(
      JSON.stringify(this.state.monsterGamePos),
    );
    monsterGamePositions.forEach(p => {
      if (p.x === x && p.y === y) {
        monsterAlreadyRegistered = true;
      }
    });
    if (monsterAlreadyRegistered) {
      return;
    }
    monsterGamePositions.push({ x, y });
    this.setState({ monsterGamePos: monsterGamePositions });
  };

  summonCharacter = (x, y, sender) => {
    const { characterGamePos } = this.state;
    let currentX = characterGamePos.x;
    let currentY = characterGamePos.y;

    if (currentX === x && currentY === y) {
      return;
    }

    const movingXForwards = currentX < x;
    const movingXBackwards = currentX > x;
    const movingYForwards = currentY < y;
    const movingYBackwards = currentY > y;
    const movingXWards = movingXForwards || movingXBackwards;
    const movingYWards = movingYForwards || movingYBackwards;

    // Only permit moving in straight lines
    if (movingXWards && movingYWards) {
      return;
    }

    // TODO refactor this to show each space movement. Possibly requires recursion
    while (x !== currentX || y !== currentY) {
      currentX += movingXForwards ? 1 : 0;
      currentX -= movingXBackwards ? 1 : 0;
      currentY += movingYForwards ? 1 : 0;
      currentY -= movingYBackwards ? 1 : 0;
      const square = this.getSquare(currentX, currentY);
      if (square) {
        if (square.current.props.onVisit) {
          square.current.props.onVisit();
        }
        this.moveCharacter(square);
        this.state.monsterGamePos.forEach(mP => {
          if (mP.x === currentX && mP.y === currentY) {
            this.setState({ gameOver: true });
          }
        });
      }
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

  moveMonster = (sender, monsterNumber) => {
    const monsterPositions = JSON.parse(JSON.stringify(this.state.monsterPos));
    const newPos = {};
    const square = findDOMNode(sender.current);
    newPos.left = square.offsetLeft;
    newPos.top = square.offsetTop;
    monsterPositions[monsterNumber] = newPos;
    this.setState({ monsterPos: monsterPositions });
  };

  // TODO Avoid creating refs on everysingle render - it is innefficient!
  // Refs should be created for spaces and monsters in the constructor
  createSpaceRef = (i, j) => {
    return this.create3DRef(i, j, this.spaceRefs);
  };

  createMonsterRef = (i, j) => {
    return this.create3DRef(i, j, this.monsterRefs);
  };

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
          <Character ref={this.character} style={this.state.characterPos} />
          {monsterPositions.map((mP, i) => {
            this.addMonster(mP.x, mP.y);
            const monsterRef = this.createMonsterRef(mP.x, mP.y);
            return (
              <Monster ref={monsterRef} style={this.state.monsterPos[i]} />
            );
          })}
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
                  return <OpenSpace spaceNumber={spaceNumber} ref={spaceRef} />;
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

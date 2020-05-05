import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Helmet } from 'react-helmet';
import { Section } from 'gg-components/Typography';
import { Button } from 'gg-components/Button';
import UntappableScrim from 'components/Scrim';
import GameOver from './GameOver.js';
import {
  OpenSpace,
  Space,
  GoalSpace,
  BlankSpace,
  ParagraphSpace,
  InputSpace,
} from 'components/Levels';
import { MONSTER_MOVING_SPEED } from 'helpers/constants';
import { cssModules } from 'bpk-react-utils';

import Character from './Character';
import Monster from './Monster';
import STYLES from './level-wrapper.scss';
import PAGE_STYLES from 'containers/pages.scss';

const getClassName = cssModules({ ...STYLES, ...PAGE_STYLES });

export default class LevelWrapper extends Component {
  static propTypes = {
    level: PropTypes.object.isRequired,
    levelNumber: PropTypes.number.isRequired,
    startSpace: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
      .isRequired,
    description: PropTypes.string,
    monsterPositions: PropTypes.array,
  };

  static defaultProps = {
    description: null,
    monsterPositions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      levelComplete: false,
      monsterGamePos: [],
      gameState: [],
      characterGamePos: { x: 0, y: 0 },
      targetCharacterGamePos: { x: 0, y: 0 },
      characterIsMoving: false,
    };
    this.character = React.createRef();
    this.spaceRefs = {};
    this.monsterRefs = {};
  }

  onLevelComplete = () => {
    this.setState({ levelComplete: true });
  };

  componentDidMount = () => {
    const { startSpace, monsterPositions, level } = this.props;

    this.setState({
      characterGamePos: startSpace || { x: 0, y: 0 },
      monsterGamePos: [],
      gameState: level || [],
    });

    this.interval = setInterval(() => {
      this.updateMonsterPositions();
    }, 1000);
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  componentWillUnmount = () => {
    this.interval = null;
  };

  updateMonsterPositions = () => {
    const newMonsterPos = [];

    this.state.monsterGamePos.forEach(m => {
      const spaceLeft = this.getSquareOnScreen(m.x, m.y - 1);
      const spaceRight = this.getSquareOnScreen(m.x, m.y + 1);
      const spaceDown = this.getSquareOnScreen(m.x - 1, m.y);
      const spaceUp = this.getSquareOnScreen(m.x + 1, m.y);

      const availableMoves = [];

      if (spaceLeft) {
        availableMoves.push({ x: m.x, y: m.y - 1 });
      }
      if (spaceRight) {
        availableMoves.push({ x: m.x, y: m.y + 1 });
      }
      if (spaceDown) {
        availableMoves.push({ x: m.x - 1, y: m.y });
      }
      if (spaceUp) {
        availableMoves.push({ x: m.x + 1, y: m.y });
      }

      if (m.moves === 'random') {
        const random = this.getRandomInt(availableMoves.length);
        const newPos = availableMoves[random];
        newMonsterPos.push({ ...m, ...newPos });
      } else {
        newMonsterPos.push(m);
      }
    });

    this.setState({ monsterGamePos: newMonsterPos });
    this.checkCharacterDeath(this.state.characterGamePos, newMonsterPos);
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

    if (this.state.gameOver) {
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

    if (square) {
      if (square.current.props.onVisit) {
        square.current.props.onVisit();
      }
      this.checkCharacterDeath(
        { x: currentX, y: currentY },
        this.state.monsterGamePos,
      );
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

  checkCharacterDeath = (characterPos, monsterGamePos) => {
    monsterGamePos.forEach(mP => {
      if (mP.x === characterPos.x && mP.y === characterPos.y) {
        setTimeout(() => {
          this.setState({ gameOver: true });
        }, 400);
      }
    });
  };

  summonCharacter = (x, y) => {
    this.setState({ targetCharacterGamePos: { x, y } });
    if (!this.state.characterIsMoving && !this.state.gameOver) {
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

  spaceIsDisabled = (x, y) =>
    this.state.characterGamePos.x !== x && this.state.characterGamePos.y !== y;

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

  getInputValue = (x, y) => {
    const gameState = this.state.gameState;
    if (gameState && gameState[x] && gameState[x][y] && gameState[x][y].value) {
      return gameState[x][y].value;
    }
    return '';
  };

  onInputChange = (x, y, e) => {
    const gameState = JSON.parse(JSON.stringify(this.state.gameState));
    if (gameState && gameState[x] && gameState[x][y]) {
      gameState[x][y].value = e.target.value;
    }

    this.setState({ gameState: gameState });
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
    let inputNumber = 0;

    const gameOverComp = <GameOver />;

    return (
      <Section
        name={`Level ${levelNumber}`}
        className={[
          getClassName('pages__container--centered'),
          getClassName('level-wrapper__outer'),
        ].join(' ')}
        {...rest}
      >
        <Helmet title={`Level ${levelNumber}`} />
        <UntappableScrim />
        {description && (
          <span className={getClassName('level-wrapper__description')}>
            {description}
          </span>
        )}
        <div className={getClassName('level-wrapper__level')}>
          <Character
            ref={this.character}
            style={this.getCharacterScreenPosition()}
          />
          {monsterPositions.map((mP, i) => {
            const monsterRef = this.createMonsterRef(mP.x, mP.y);
            return (
              <Monster
                ref={monsterRef}
                style={this.getMonsterScreenPosition(i)}
              />
            );
          })}
          {this.state.gameOver && gameOverComp}
          {level.map(row => (
            <div className={getClassName('level-wrapper__row')}>
              {row.map(spaceDef => {
                const spaceRef = this.createSpaceRef(spaceDef.x, spaceDef.y);
                if (spaceDef.type === 'a') {
                  spaceNumber += 1;
                  return (
                    <Space
                      disabled={this.spaceIsDisabled(spaceDef.x, spaceDef.y)}
                      spaceNumber={spaceNumber}
                      ref={spaceRef}
                      onClick={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    />
                  );
                }
                if (spaceDef.type === 'i') {
                  inputNumber += 1;
                  return (
                    <InputSpace
                      disabled={this.spaceIsDisabled(spaceDef.x, spaceDef.y)}
                      inputNumber={inputNumber}
                      vaulue={this.getInputValue(spaceDef.x, spaceDef.y)}
                      onChange={e =>
                        this.onInputChange(spaceDef.x, spaceDef.y, e)
                      }
                      ref={spaceRef}
                      onClick={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    />
                  );
                }
                if (spaceDef.type === 's') {
                  return <OpenSpace spaceNumber={spaceNumber} ref={spaceRef} />;
                }
                if (spaceDef.type === 'b') {
                  return <BlankSpace spaceNumber={spaceNumber} />;
                }
                if (spaceDef.type === 'p') {
                  return <ParagraphSpace text={spaceDef.text} />;
                }
                if (spaceDef.type === 'g') {
                  spaceNumber += 1;
                  let disabled = this.spaceIsDisabled(spaceDef.x, spaceDef.y);
                  if (spaceDef.condition) {
                    disabled =
                      disabled || !spaceDef.condition(this.state.gameState);
                  }
                  return (
                    <GoalSpace
                      disabled={disabled}
                      spaceNumber={spaceNumber}
                      onVisit={() => this.onLevelComplete()}
                      ref={spaceRef}
                      onClick={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    />
                  );
                }
              })}
              <br />
            </div>
          ))}
        </div>
        <Button
          large
          disabled={!this.state.levelComplete}
          href={`/level/${levelNumber + 1}`}
        >
          Continue to level {levelNumber + 1}
        </Button>
      </Section>
    );
  }
}

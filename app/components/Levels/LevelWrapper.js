import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Helmet } from 'react-helmet';
import { PageTitle, Paragraph } from 'gg-components/Typography';
import { Button } from 'gg-components/Button';
import UntappableScrim from 'components/Scrim';
import GameOver from './GameOver';
import OilSpill from './OilSpill';
import {
  BlankSpace,
  GoalSpace,
  KeySpace,
  GrassSpace,
  HeadingSpace,
  Hint,
  InputSpace,
  LavaSpace,
  ParagraphSpace,
  Space,
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
    oilSpills: PropTypes.array,
  };

  static defaultProps = {
    description: null,
    monsterPositions: [],
    oilSpills: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      levelComplete: false,
      monsterGamePos: [],
      gameState: [],
      characterGamePos: { x: 0, y: 0 },
      targetCharacterGamePositions: [],
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
    this.checkCharacterDeath(
      this.state.characterGamePos,
      newMonsterPos,
      this.state.gameState,
    );
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

  getSquareOnScreen = (x, y) => {
    return this.get3DEntityOnScreen(x, y, this.spaceRefs);
  };

  getMonsterOnScreen = (x, y) => {
    return this.get3DEntityOnScreen(x, y, this.monsterRefs);
  };

  moveCharacter = (xOverride, yOverride) => {
    let { characterGamePos, targetCharacterGamePositions } = this.state;
    let nextTargetCharacterGamePosition = characterGamePos;
    if (targetCharacterGamePositions.length > 0) {
      nextTargetCharacterGamePosition = targetCharacterGamePositions.shift();
    }
    this.setState({
      targetCharacterGamePositions: targetCharacterGamePositions,
    });
    let { x, y } = nextTargetCharacterGamePosition;
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

    const jumpingXWards = movingXWards && Math.abs(x - currentX) > 1;
    const jumpingYWards = movingYWards && Math.abs(y - currentY) > 1;
    const jumping = jumpingXWards || jumpingYWards;
    if (jumping) {
      // TODO set transition to null
    } else {
      // TODO set transition to 0.2s
    }

    const square = this.getSquareOnScreen(x, y);

    if (square) {
      if (square.current.props.onVisit) {
        square.current.props.onVisit();
      }
      this.checkCharacterDeath(
        { x, y },
        this.state.monsterGamePos,
        this.state.gameState,
      );
    }

    const newGameState = JSON.parse(JSON.stringify(this.state.gameState));
    newGameState[x][y].visited = true;

    this.setState({
      characterIsMoving: true,
      characterGamePos: { x, y },
      gameState: newGameState,
    });

    // Recursively call the moving function to continue character movement
    setTimeout(() => {
      this.moveCharacter();
    }, MONSTER_MOVING_SPEED * 1000);
  };

  checkCharacterDeath = (characterPos, monsterGamePos, gameState) => {
    let dead = false;
    let { x: charX, y: charY } = characterPos;

    if (
      gameState &&
      gameState[charX] &&
      gameState[charX][charY] &&
      gameState[charX][charY].type &&
      gameState[charX][charY].type === 'l'
    ) {
      dead = true;
    }

    monsterGamePos.forEach(mP => {
      if (mP.x === characterPos.x && mP.y === characterPos.y) {
        dead = true;
      }
    });

    if (dead) {
      setTimeout(() => {
        this.setState({ gameOver: true });
      }, 200);
    }
  };

  // Instad of having a single destination for the character, we should keep a list of moves to do.
  summonCharacter = (x, y) => {
    const { targetCharacterGamePositions } = this.state;
    targetCharacterGamePositions.push({ x, y });
    this.setState({ targetCharacterGamePositions });

    if (!this.state.characterIsMoving && !this.state.gameOver) {
      this.moveCharacter(x, y);
    }
  };

  getSquareScreenPosition = (x, y) => {
    const squareRef = this.getSquareOnScreen(x, y);
    if (!squareRef) {
      return null;
    }
    const result = {};
    const square = findDOMNode(squareRef.current);
    result.left = square.offsetLeft;
    result.top = square.offsetTop;
    return result;
  };

  getOilSpillStyle = os => {
    const style = {};
    style.left = `${os.x * 2}rem`;
    style.top = `${os.y * 2}rem`;
    style.width = `${os.width * 2}rem`;
    style.height = `${os.height * 2}rem`;
    return style;
  };

  getCharacterScreenPosition = () => {
    const characterPosition = this.state.characterGamePos;
    if (!characterPosition) {
      return;
    }
    return this.getSquareScreenPosition(
      characterPosition.x,
      characterPosition.y,
    );
  };

  getMonsterScreenPosition = monsterNumber => {
    const monsterPosition = this.state.monsterGamePos[monsterNumber];
    if (!monsterPosition) {
      return;
    }
    return this.getSquareScreenPosition(monsterPosition.x, monsterPosition.y);
  };

  tabIndexForSpace = (x, y) => {
    if (this.spaceIsAriaHidden(null, x, y)) {
      return -1;
    }
    return 0;
  };

  spaceIsAriaHidden = (type, x, y) => {
    // goal is never hidden
    if (type === 'g') {
      return false;
    }

    if (this.state.gameOver) {
      return true;
    }
    if (this.state.levelComplete) {
      return true;
    }

    return false;
  };

  spaceIsDisabled = (type, x, y) => {
    if (this.spaceIsAriaHidden(type, x, y)) {
      return true;
    }

    return false;
    // return (
    //   this.state.characterGamePos.x !== x && this.state.characterGamePos.y !== y
    // );
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
      oilSpills,
      level,
      hints,
      ...rest
    } = this.props;

    let spaceNumber = 0;
    let inputNumber = 0;

    const gameOverComp = <GameOver />;

    const hintsToDisplay = [];
    level.forEach((row, i) => {
      row.forEach((spaceDef, j) => {
        let spaceHint = null;
        if (spaceDef.getHint) {
          spaceHint = spaceDef.getHint(this.state.gameState);
        }
        if (spaceHint) {
          hintsToDisplay.push({ text: spaceHint, x: i, y: j });
        }
      });
    });

    return (
      <PageTitle
        autoFocus
        name={`Stage ${levelNumber}`}
        className={[
          getClassName('pages__container--centered'),
          getClassName('level-wrapper__outer'),
        ].join(' ')}
        {...rest}
      >
        <Helmet title={`Stage ${levelNumber}`} />
        <UntappableScrim />
        {description && (
          <Paragraph className={getClassName('level-wrapper__description')}>
            {description}
          </Paragraph>
        )}
        <div className={getClassName('level-wrapper__level')}>
          <Character
            ref={this.character}
            style={this.getCharacterScreenPosition()}
          />
          {oilSpills.map((oS, i) => {
            return <OilSpill style={this.getOilSpillStyle(oS)} />;
          })}
          {hintsToDisplay.map((hint, i) => {
            return (
              <Hint
                text={hint.text}
                style={{
                  left: `${hint.y * 2}rem`,
                  top: `${hint.x * 2}rem`,
                }}
              />
            );
          })}
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
                      tabIndex={this.tabIndexForSpace(spaceDef.x, spaceDef.y)}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      disabled={this.spaceIsDisabled(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
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
                      tabIndex={this.tabIndexForSpace(spaceDef.x, spaceDef.y)}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      disabled={this.spaceIsDisabled(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
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
                if (spaceDef.type === 'k') {
                  spaceNumber += 1;
                  return (
                    <KeySpace
                      spaceNumber={spaceNumber}
                      showKey={
                        !(
                          this.state.gameState &&
                          this.state.gameState[0] &&
                          this.state.gameState[0][4] &&
                          this.state.gameState[0][4].visited
                        )
                      }
                      ref={spaceRef}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      onFocus={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    >
                      {spaceDef.subElements}
                    </KeySpace>
                  );
                }
                if (spaceDef.type === 's') {
                  spaceNumber += 1;
                  return (
                    <GrassSpace
                      spaceNumber={spaceNumber}
                      ref={spaceRef}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      onFocus={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    >
                      {spaceDef.subElements}
                    </GrassSpace>
                  );
                }
                if (spaceDef.type === 'h') {
                  spaceNumber += 1;
                  return (
                    <HeadingSpace
                      spaceNumber={spaceNumber}
                      ref={spaceRef}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      onFocus={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    >
                      {spaceDef.subElements}
                    </HeadingSpace>
                  );
                }
                if (spaceDef.type === 'l') {
                  return (
                    <LavaSpace
                      spaceNumber={spaceNumber}
                      ref={spaceRef}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      onFocus={() =>
                        this.summonCharacter(spaceDef.x, spaceDef.y)
                      }
                    >
                      {spaceDef.subElements}
                    </LavaSpace>
                  );
                }
                if (spaceDef.type === 'b') {
                  return <BlankSpace spaceNumber={spaceNumber} />;
                }
                if (spaceDef.type === 'p') {
                  return (
                    <ParagraphSpace
                      ref={spaceRef}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      text={spaceDef.text}
                    />
                  );
                }
                if (spaceDef.type === 'g') {
                  spaceNumber += 1;
                  let disabled = this.spaceIsDisabled(
                    spaceDef.type,
                    spaceDef.x,
                    spaceDef.y,
                  );
                  if (spaceDef.condition) {
                    disabled =
                      disabled || !spaceDef.condition(this.state.gameState);
                  }
                  return (
                    <GoalSpace
                      tabIndex={this.tabIndexForSpace(spaceDef.x, spaceDef.y)}
                      aria-hidden={this.spaceIsAriaHidden(
                        spaceDef.type,
                        spaceDef.x,
                        spaceDef.y,
                      )}
                      disabled={disabled}
                      spaceNumber={spaceNumber}
                      onVisit={() => this.onLevelComplete()}
                      ref={spaceRef}
                      onFocus={() =>
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
      </PageTitle>
    );
  }
}

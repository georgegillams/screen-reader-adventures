import React from 'react';
import LevelWrapper, { SubParagraph, SubHeading } from 'components/Levels';
import { getCopy } from 'helpers/copyHelpers';
import { generateLevelDefinition } from 'helpers/gameLogic';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

const Container = props => {
  const levelDefinition = generateLevelDefinition([
    ['s'],
    ['s'],
    ['s'],
    ['a'],
    ['s'],
    ['s'],
    ['g'],
  ]);

  // First content square is 1 down, 0 across
  levelDefinition[1][0].subElements = [
    <SubParagraph>These</SubParagraph>,
    <SubParagraph>aren&apos;t</SubParagraph>,
    <SubParagraph>the</SubParagraph>,
    <SubParagraph>droids</SubParagraph>,
    <SubParagraph>you&apos;re</SubParagraph>,
    <SubParagraph>looking</SubParagraph>,
    <SubParagraph>for</SubParagraph>,
  ];

  // First content square is 2 down, 0 across
  levelDefinition[2][0].subElements = [
    <SubParagraph>He</SubParagraph>,
    <SubParagraph>can</SubParagraph>,
    <SubParagraph>go</SubParagraph>,
    <SubParagraph>about</SubParagraph>,
    <SubParagraph>his</SubParagraph>,
    <SubParagraph>business.</SubParagraph>,
    <SubHeading>Move along!</SubHeading>,
  ];

  // First content square is 4 down, 0 across
  levelDefinition[4][0].subElements = [
    <SubParagraph>These</SubParagraph>,
    <SubParagraph>aren&apos;t</SubParagraph>,
    <SubParagraph>the</SubParagraph>,
    <SubParagraph>droids</SubParagraph>,
    <SubParagraph>you&apos;re</SubParagraph>,
    <SubParagraph>looking</SubParagraph>,
    <SubParagraph>for</SubParagraph>,
  ];

  // First content square is 5 down, 0 across
  levelDefinition[5][0].subElements = [
    <SubParagraph>He</SubParagraph>,
    <SubParagraph>can</SubParagraph>,
    <SubParagraph>go</SubParagraph>,
    <SubParagraph>about</SubParagraph>,
    <SubParagraph>his</SubParagraph>,
    <SubParagraph>business.</SubParagraph>,
    <SubHeading>Move along!</SubHeading>,
  ];

  return (
    <LevelWrapper
      levelNumber={4}
      description={getCopy('level4Description')}
      level={levelDefinition}
      startSpace={{ x: 0, y: 0 }}
      {...props}
    />
  );
};

export default Container;

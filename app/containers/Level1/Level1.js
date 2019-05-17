import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { TextLink, Section } from 'components/Typography';
import GGButton from 'components/GGButton';
import PhotoGallery from 'components/PhotoGallery';
import { OpenSpace, Space, GoalSpace } from 'components/Levels';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

const getClassName = cssModules(STYLES);

export default class Level1 extends Component {
  constructor(props) {
    super(props);

    this.space1 = React.createRef();
    this.space5 = React.createRef();
  }
  render() {
    const { onLevelComplete, summonCharacter, ...rest } = this.props;

    return (
      <div {...rest}>
        <Space
          spaceNumber={1}
          ref={this.space1}
          onClick={() => {
            summonCharacter(this.space1);
          }}
        />
        <OpenSpace />
        <OpenSpace />
        <OpenSpace />
        <GoalSpace
          spaceNumber={5}
          onVisit={() => onLevelComplete()}
          ref={this.space5}
          onClick={() => {
            summonCharacter(this.space5);
          }}
        />
      </div>
    );
  }
}

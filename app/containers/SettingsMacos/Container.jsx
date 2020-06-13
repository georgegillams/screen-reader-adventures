import React from 'react';
import Helmet from 'react-helmet';
import {
  PageTitle,
  SubSection,
  TextLink,
  Paragraph,
} from 'gg-components/Typography';
import { SegmentedControl } from 'gg-components/SegmentedControl';
import { Checkbox } from 'gg-components/Checkbox';
import { Button } from 'gg-components/Button';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';

import { getCopy } from 'helpers/copyHelpers';
import {
  setPlatform,
  getTouchBar,
  setTouchBar,
  getVOKey,
  setVOKey,
} from 'utils/storageHelpers';
import Image from 'components/Image';

const getClassName = cssModules(STYLES);

class SettingsMacos extends React.Component {
  constructor(props) {
    super(props);

    this.state = { touchBar: null, voKey: null };

    const currentTouchBarSetting = getTouchBar();
    if (currentTouchBarSetting === 'touchBar') {
      this.state.touchBar = 0;
    } else if (currentTouchBarSetting === 'noTouchBar') {
      this.state.touchBar = 1;
    }

    const currentVOKeySetting = getVOKey();
    if (currentVOKeySetting === 'ctrl+option') {
      this.state.voKey = 0;
    } else if (currentVOKeySetting === 'caps lock') {
      this.state.voKey = 1;
    }
  }

  componentDidMount() {
    setPlatform('macOS');
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Setup VoiceOver on macOS" />
        <PageTitle
          link={{ text: 'Change platform', to: '/' }}
          name="Configure Screen Reader Adventures"
        >
          <Paragraph>{getCopy('configure1')}</Paragraph>
          <SegmentedControl
            options={[
              { key: 'touchBar', label: 'TouchBar' },
              { key: 'noTouchBar', label: 'No TouchBar' },
            ]}
            selectedIndex={this.state.touchBar}
            onSelectionChanged={(newIndex, newKey) => {
              this.setState({ touchBar: newIndex });
              setTouchBar(newKey);
            }}
          />
          <br />
          <br />
          <Paragraph>{getCopy('configure2')}</Paragraph>
          <SegmentedControl
            options={[
              { key: 'ctrl+option', label: 'Ctrl + Option' },
              { key: 'caps lock', label: 'Caps lock' },
            ]}
            selectedIndex={this.state.voKey}
            onSelectionChanged={(newIndex, newKey) => {
              this.setState({ voKey: newIndex });
              setVOKey(newKey);
            }}
          />
          <br />
          <br />
          <Button
            className={getClassName('pages__component')}
            large
            href="/setup/macOS"
          >
            {getCopy('settingsCTA')}
          </Button>
        </PageTitle>
      </div>
    );
  }
}

export default SettingsMacos;

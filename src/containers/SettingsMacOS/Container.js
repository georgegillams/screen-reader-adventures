import React, { useState, useEffect } from 'react';
import PageTitle from 'components/common/PageTitle';
import { Paragraph } from 'gg-components/Paragraph';
import { SegmentedControl } from 'gg-components/SegmentedControl';
import { PageContainer } from 'gg-components/PageContainer';
import { Button } from 'gg-components/Button';
import { cssModules } from 'gg-components/helpers/cssModules';

import { getCopy } from 'helpers/copyHelpers';
import {
  setPlatform,
  getTouchBar,
  setTouchBar as setTouchBarDisk,
  getVOKey,
  setVOKey as setVOKeyDisk,
} from 'utils/storageHelpers';

const getClassName = cssModules({});

const SettingsMacos = props => {
  const [touchBar, setTouchBarState] = useState(null);
  const [VOKey, setVOKeyState] = useState(null);

  useEffect(() => {
    setPlatform('macOS');

    const currentTouchBarSetting = getTouchBar();
    if (currentTouchBarSetting === 'touchBar') {
      setTouchBarState(0);
    } else if (currentTouchBarSetting === 'noTouchBar') {
      setTouchBarState(1);
    }

    const currentVOKeySetting = getVOKey();
    if (currentVOKeySetting === 'ctrl+option') {
      setVOKeyState(0);
    } else if (currentVOKeySetting === 'caps lock') {
      setVOKeyState(1);
    }
  }, []);

  return (
    <PageContainer {...props}>
      <PageTitle link={{ text: 'Change platform', to: '/' }} name="Configure Screen Reader Adventures">
        <Paragraph>{getCopy('configure1')}</Paragraph>
        <SegmentedControl
          options={[
            { key: 'touchBar', label: 'TouchBar' },
            { key: 'noTouchBar', label: 'No TouchBar' },
          ]}
          selectedIndex={touchBar}
          onSelectionChanged={(newIndex, newKey) => {
            setTouchBarState(newIndex);
            setTouchBarDisk(newKey);
          }}
        />
        <Paragraph>{getCopy('configure2')}</Paragraph>
        <SegmentedControl
          options={[
            { key: 'ctrl+option', label: 'Ctrl + Option' },
            { key: 'caps lock', label: 'Caps lock' },
          ]}
          selectedIndex={VOKey}
          onSelectionChanged={(newIndex, newKey) => {
            setVOKeyState(newIndex);
            setVOKeyDisk(newKey);
          }}
        />
        <br />
        <br />
        <Button className={getClassName('pages__component')} large href="/setup/macOS">
          {getCopy('settingsCTA')}
        </Button>
      </PageTitle>
    </PageContainer>
  );
};

export default SettingsMacos;

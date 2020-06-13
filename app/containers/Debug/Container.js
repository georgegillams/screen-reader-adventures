import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Checkbox } from 'gg-components/Checkbox';
import { Paragraph, PageTitle } from 'gg-components/Typography';

const StatusControl = props => {
  const { name, storageKey } = props;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const debugEnabled = window.localStorage.getItem(storageKey) === 'true';
    setIsEnabled(debugEnabled);
  }, []);

  const onValueChanged = newValue => {
    setIsEnabled(newValue);
    window.localStorage.setItem(storageKey, newValue ? 'true' : 'false');
  };

  return (
    <Checkbox
      label={name}
      checked={isEnabled}
      onChange={event => {
        onValueChanged(event.target.checked);
      }}
    />
  );
};

StatusControl.propTypes = {
  name: PropTypes.string.isRequired,
  storageKey: PropTypes.string.isRequired,
};

const Debug = props => (
  <div {...props}>
    <Helmet title="Debug" />
    <PageTitle anchor={false} name="Debug">
      <StatusControl
        name="Show session debug views"
        storageKey="showSessionDebugViews"
      />
      <br />
      <br />
      <StatusControl
        name="Show page container debug colours"
        storageKey="showPageContainerDebugColor"
      />
      <br />
      <Paragraph>
        Note that changes will not take effect until you reload the page.
      </Paragraph>
    </PageTitle>
  </div>
);

export default Debug;

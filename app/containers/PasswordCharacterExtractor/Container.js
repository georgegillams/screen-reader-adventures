import React from 'react';
import { cssModules } from 'bpk-react-utils';

import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { NotificationComp } from 'gg-components/dist/Notifications';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class PasswordCharacterExtractor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div>
        <NotificationComp type="error">
          This is a legacy page, so it may take some time to load.
        </NotificationComp>
        <iframe
          id="workPasswordCharExtractorInline"
          title="Inline Work PasswordCharacterExtractor page"
          width="100%"
          height="50rem"
          style={{ border: 'none', height: '170rem' }}
          src="https://georgegillams-depreciated.herokuapp.com/apps/password-character-extractor"
        />
      </div>
    );
  }
}

export default PasswordCharacterExtractor;
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/dist/Input';
import BpkCheckBox from 'bpk-component-checkbox';
import { cssModules } from 'bpk-react-utils';

import FormBuilder from './FormBuilder';
import STYLES from './forms.scss';

import { TextLink } from 'gg-components/dist/Typography';
import {Button} from 'gg-components/dist/Button';
import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
  NAME_REGEX,
  DATE_REGEX,
} from 'helpers/constants';
import { formValueChanged } from 'helpers/objects';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

class SignUpContinueFormPhotoRelease extends React.Component {
  static propTypes = {
    userDetails: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      className,
      userDetails,
      onSubmit,
      onDataChanged,
      submitLabel,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <div className={classNameFinal.join(' ')} {...rest}>
        Wessex CCP EPICC Conference 2019 and/or Wessex CCP, event organisers,
        sponsors and media outlets have the right and permission to record, use
        and publish photographs/film/videotapes/electronic representation (eg:
        Websites) and or sound/recordings made of participants in events
        associated with Wessex CCP EPICC Conference 2019 and/or Wessex CCP.
        <br />
        <br />
        The reproduction, copyright, exhibit, broadcast, electronic storage
        and/or distribution of said photographs/film/videotapes/electronic
        representation and/or sound/recordings is without limitation and is at
        the discretion of Wessex CCP EPICC Conference 2019 and/or Wessex CCP.
        <br />
        <br />
        <BpkCheckBox
          className={getClassName('forms__component')}
          name="photoReleaseConsented"
          label="I have read and understood, and agree to the above photo release terms."
          checked={userDetails.photoReleaseConsented}
          onChange={event =>
            formValueChanged(
              userDetails,
              'photoReleaseConsented',
              event,
              onDataChanged,
            )
          }
        />
        <br />
        <Button
          className={getClassName('forms__component')}
          large
          onClick={onSubmit}
          disabled={!userDetails.photoReleaseConsented}
        >
          Continue
        </Button>
        <br />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            secondary
            className={getClassName('forms__component')}
            onClick={onSubmit}
            disabled={userDetails.photoReleaseConsented}
          >
            Proceed without agreeing to photo release terms
          </Button>
        </div>
      </div>
    );
  }
}

export default SignUpContinueFormPhotoRelease;

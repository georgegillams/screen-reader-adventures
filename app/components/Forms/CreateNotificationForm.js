import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/Input';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Button } from 'gg-components/Button';

import STYLES from './forms.scss';

const getClassName = cssModules(STYLES);

const CreateNotificationForm = props => {
  const {
    className,
    notification,
    onDataChanged,
    onSubmit,
    submitLabel,
    ...rest
  } = props;

  const onTypeChanged = event => {
    const newValue = JSON.parse(JSON.stringify(props.notification));
    newValue.type = event.target.value;
    onDataChanged(newValue);
  };

  const onMessageChanged = event => {
    const newValue = JSON.parse(JSON.stringify(props.notification));
    newValue.message = event.target.value;
    onDataChanged(newValue);
  };

  const classNameFinal = [];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <label htmlFor="type" className={getClassName('forms__label')}>
        Type
      </label>
      <Input
        className={getClassName('forms__component')}
        id="type"
        name="type"
        value={notification.type}
        onChange={onTypeChanged}
        placeholder="type"
      />
      <label htmlFor="message" className={getClassName('forms__label')}>
        Message
      </label>
      <Input
        className={getClassName('forms__component')}
        id="message"
        name="message"
        value={notification.message}
        onChange={onMessageChanged}
        placeholder="message"
      />
      <br />
      <Button
        large
        className={getClassName('forms__component')}
        onClick={onSubmit}
      >
        {submitLabel || 'Create notification'}
      </Button>
    </div>
  );
};

CreateNotificationForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notification: PropTypes.object.isRequired,
  onDataChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  centered: PropTypes.bool,
  className: PropTypes.string,
  submitLabel: PropTypes.string,
};

CreateNotificationForm.defaultProps = {
  centered: false,
  className: null,
  submitLabel: null,
};

export default CreateNotificationForm;

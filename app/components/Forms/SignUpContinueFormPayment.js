import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import GGButton from 'components/GGButton';
import { Section } from 'components/Typography';
import {
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestGGButtonElement,
  IbanElement,
  IdealBankElement,
} from 'react-stripe-elements';

import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
  CARD_NUMBER_REGEX,
  CVV_REGEX,
  EXPIRY_REGEX,
  NAME_REGEX,
  TICKET_COST,
} from 'helpers/constants';

import FormBuilder from './FormBuilder';

import STYLES from './forms.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

class SignUpContinueFormPayment extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    userDetails: PropTypes.object.isRequired,
    onDataChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  submit = () => {
    this.props.stripe
      .createToken({
        name: 'Payment_token',
      })
      .then(result => {
        const { token } = result;
        this.props.onSubmit(token);
      });
  };

  render() {
    const {
      className,
      disabled,
      user,
      userDetails,
      presubmitText,
      onSubmit,
      balance,
      ...rest
    } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    if (balance <= 0) {
      return (
        <Fragment>
          <div className={getClassName("forms__component")}>
            {'You can view and edit your details via your EPICC account.'}
          </div>
          <GGButton
            disabled={disabled}
            className={getClassName("forms__component")}
            large
            href="/account"
          >
            {'View/edit details'}
          </GGButton>
        </Fragment>
      );
    }

    return (
      <div>
        <label htmlFor="cardNumber" className={getClassName("forms__label")}>
          Card number
        </label>
        <CardNumberElement className={getClassName("forms__component forms__bpk-input")} />
        <label htmlFor="expiry" className={getClassName("forms__label")}>
          Expiry date
        </label>
        <CardExpiryElement className={getClassName("forms__component forms__bpk-input")} />
        <label htmlFor="cvc" className={getClassName("forms__label")}>
          CVC code
        </label>
        <CardCVCElement className={getClassName("forms__component forms__bpk-input")} />
        <label htmlFor="postCode" className={getClassName("forms__label")}>
          Post code
        </label>
        <PostalCodeElement className={getClassName("forms__component forms__bpk-input")} />
        {presubmitText && (
          <Fragment>
            <div className={getClassName("forms__component")}>{presubmitText}</div>
          </Fragment>
        )}
        <GGButton
          disabled={disabled}
          className={getClassName("forms__component")}
          large
          onClick={this.submit}
        >
          {`Make payment for £${balance / 100}`}
        </GGButton>
      </div>
    );
  }
}

export default injectStripe(SignUpContinueFormPayment);

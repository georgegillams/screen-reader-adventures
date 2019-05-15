import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import { CreatePaymentForm } from 'components/Forms';
import {
  MONZOME_LINK_REGEX,
  SORT_CODE_REGEX,
  INT_REGEX,
  STRING_REGEX,
  DECIMAL_REGEX,
  GG_EMAIL,
} from 'helpers/constants';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED



export default class PaymentsPage extends React.Component {
  render() {
    const {
      paymentChanged,
      payment,
      createPayment,
      createdPayment,
      paymentCreating,
      createPaymentError,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Payments" />
        <Section name="Send me money">
          If you want to send me money, you can do so in a number of ways:
          <SubSection name="Bank transfer">
            A simple bank transfer to
            <CodeInline>04-00-04</CodeInline>
            <CodeInline>05339705</CodeInline>
            would do.
          </SubSection>
          <SubSection name="Monzo">
            If you have Monzo, you can transfer money directly using my phone
            number (
            <TextLink href="tel:+447867592615">+44 786759 2615</TextLink>)<br />
            Otherwise,{' '}
            <TextLink external href="https://monzo.me/georgestuartgillams">
              pay me via Monzo{' '}
            </TextLink>{' '}
            online.
          </SubSection>
          <SubSection name="Circle">
            If you use circle, you can send me money on there using my email (
            <TextLink href={`mailto:${GG_EMAIL}`}>{GG_EMAIL}</TextLink>
            ). If you don't already have Circle and you wanna get £5, use this
            link to{' '}
            <TextLink external href="https://www.circle.com/invite/2RH58S">
              sign up to Circle pay{' '}
            </TextLink>
            😉.
          </SubSection>
          <SubSection name="Crypto">
            Here are my crypto wallet addresses incase you&apos;re actually a
            hipster!
            <br />
            <br />
            Bitcoin: <CodeInline>3ApNpbGMWMVVhRJuBLYtZtLwaHqhW73vbw</CodeInline>
            <br />
            Bitcoin Cash:{' '}
            <CodeInline>
              {'qrg7fqthkw08yzp9ys6v7m7394lqj96dzczkhg6r77'}
            </CodeInline>
            <br />
            Ethereum:{' '}
            <CodeInline>
              {'0x5126FD065a2d7Cf77f50f6DDF8DEd144a3e04db3'}
            </CodeInline>
            <br />
            Litecoin:{' '}
            <CodeInline>MPz6NNqU8U2nZMQX3WTwXJjZFhUA31Q1F6</CodeInline>
          </SubSection>
        </Section>
        <Section name="Request money from me">
          If I owe you money, you can request it below.
          <br />
          Either provide a monzo.me link, or a sort-code and account number.
          <br />
          <CreatePaymentForm
            payment={payment}
            onDataChanged={paymentChanged}
            onSubmit={createPayment}
          />
          {paymentCreating && <text>paymentCreating</text>}
          <br />
          {createdPayment && <text>createdPayment</text>}
          <br />
          {createPaymentError && <text>createPaymentError</text>}
        </Section>
      </div>
    );
  }
}

PaymentsPage.propTypes = {
  paymentCreating: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  createPayment: PropTypes.func.isRequired,
  className: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import { GG_EMAIL } from 'helpers/constants';

export default class PaymentsPage extends React.Component {
  render() {
    const { className, ...rest } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Payments" />
        <Section name="Send me money">
          If you want to send me money, you can do so in a number of ways:
          <SubSection name="Bank transfer">
            A simple bank transfer to <CodeInline>04-00-04</CodeInline>{' '}
            <CodeInline>05339705</CodeInline> would do.
          </SubSection>
          <SubSection name="Monzo">
            You can send me money directly on Monzo:{' '}
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
      </div>
    );
  }
}

PaymentsPage.propTypes = {
  className: PropTypes.string,
};

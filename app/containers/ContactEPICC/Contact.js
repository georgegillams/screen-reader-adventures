import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Section, TextLink } from 'components/Typography';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import GGButton from 'components/GGButton';
import { EPICC_EMAIL } from 'helpers/constants';
import STYLES from '../pages.scss';
import { cssModules } from 'bpk-react-utils';

const getClassName = cssModules(STYLES);

export default class Contact extends Component {
  render() {
    return (
      <div
        className={[
          getClassName('pages__container'),
          getClassName('pages__container--centered'),
        ].join(' ')}
      >
        <Helmet title="Contact" />
        <Section name="Get in touch">
          If you experience any issues or have any questions, please contact us
          at:{' '}
          <TextLink href="mailto:epicc-conference@wessexccp.org">
            epicc-conference@wessexccp.org
          </TextLink>
          .
        </Section>
      </div>
    );
  }
}

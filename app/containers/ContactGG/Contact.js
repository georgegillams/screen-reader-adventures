import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import { Section, SubSection } from 'components/Typography';
import GGButton from 'components/GGButton';
import { GG_EMAIL } from 'helpers/constants';

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
          <div
            style={{ paddingTop: '1rem' }}
            className={getClassName('pages__compact-card-container')}
          >
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/nmkJVkO.png"
              href="https://www.fb.com/georgegillams"
              title="Facebook"
            />
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/2x6do1x.png"
              href="https://www.linkedin.com/in/george-gillams-37537077"
              title="Linkedin"
            />
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/54unoGD.png"
              href={`mailto:${GG_EMAIL}`}
              title="Email"
            >
              <Section>{GG_EMAIL}</Section>
            </ArticleCard>
            <ArticleCard
              layout={CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/9hcLfgF.png"
              href="tel:+447867592615"
              title="Phone"
            >
              <Section>+44 78675 92615</Section>
            </ArticleCard>
          </div>
          <br />
          <br />
          <GGButton
            hrefExternal
            href="https://www.dropbox.com/s/aj9wjgotkldd18j/georgegillams.vcf?dl=1"
          >
            Download contact (iOS)
          </GGButton>
          <br />
          <br />
          <GGButton
            hrefExternal
            href="https://www.dropbox.com/s/k8hmxeh2qpjqx66/google.csv?dl=1"
          >
            Download contact (Android)
          </GGButton>
          <br />
          <br />
          <SubSection
            className={getClassName('pages__card')}
            noAnchor
            name="Alternatively find me on WhatsApp or Signal"
          />
          {/* <br />
        <a
          href="https://www.fb.com/georgegillams"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Facebook georgegillams" link />
        </a>
        <a
          href={`mailto:${GG_EMAIL}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name={`Email ${GG_EMAIL}`} link />
        </a>
        <a href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <SubSection noAnchor name="Call +44 (0) 786759 2615" link />
        </a>
      <a
          href="https://georgegillams.typeform.com/to/oBmiJZ"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SubSection noAnchor name="Contact me online" link />
        </a>   */}
        </Section>
      </div>
    );
  }
}

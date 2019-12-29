import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import PAGES_STYLES from '../pages.scss';
import STYLES from './contact.scss';

import { InfoCell, INFO_CELL_STYLES } from 'gg-components/dist/InfoCell';
import withScroll from 'gg-components/dist/ScrollContainer/withScroll.js';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { Button } from 'gg-components/dist/Button';
import { GG_EMAIL } from 'helpers/constants';
import facebookLogo from './facebook.svg';
import twitterLogo from './twitter.svg';
import linkedinLogo from './linkedin.svg';
import gurushotsLogo from './gurushots.svg';
import flickrLogo from './flickr.svg';
import githubLogo from './github.svg';
import emailLogo from './email.svg';

const DummyInfoCell = props => (
  <div>{`scrollPosition: ${props.scrollPosition}`} </div>
);

const InfoCellWithScroll = withScroll(InfoCell);

const getClassName = cssModules({ ...PAGES_STYLES, ...STYLES });

export default class Contact extends Component {
  render() {
    return (
      <div className={[getClassName('pages__container--centered')].join(' ')}>
        <Helmet title="Contact" />
        <Section name="Get in touch">
          <div className={getClassName('pages__full-width-container')}>
            <InfoCellWithScroll
              title="Facebook"
              content={
                <TextLink
                  href="https://www.facebook.com/georgegillams"
                  external
                >
                  See my profile on Facebook
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName('contact__icon-image')}
                    src={facebookLogo}
                  />
                </div>
              }
            />
            <InfoCellWithScroll
              title="Twitter"
              cellStyle={INFO_CELL_STYLES.dark}
              content={
                <TextLink href="https://twitter.com/georgegillams" external>
                  See my profile on Twitter
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName('contact__icon-image')}
                    src={twitterLogo}
                  />
                </div>
              }
            />
            <InfoCellWithScroll
              title="Linkedin"
              content={
                <TextLink
                  href="https://www.linkedin.com/in/george-gillams-37537077"
                  external
                >
                  See my profile on Linkedin
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName('contact__icon-image')}
                    src={linkedinLogo}
                  />
                </div>
              }
            />
            <InfoCellWithScroll
              title="GitHub"
              cellStyle={INFO_CELL_STYLES.dark}
              content={
                <TextLink href="https://github.com/georgegillams" external>
                  See my profile on GitHub
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName(
                      'contact__icon-image',
                      'contact__icon-image--dark-invert',
                    )}
                    src={githubLogo}
                  />
                </div>
              }
            />
            <InfoCellWithScroll
              title="Email"
              content={
                <TextLink href="mailto:hello@georgegillams.co.uk" external>
                  Email {GG_EMAIL}
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName('contact__icon-image')}
                    src={emailLogo}
                  />
                </div>
              }
            />
            <InfoCellWithScroll
              title="Flickr"
              cellStyle={INFO_CELL_STYLES.dark}
              content={
                <TextLink
                  href="https://www.flickr.com/people/georgegillams"
                  external
                >
                  See my profile on Flickr
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName('contact__icon-image')}
                    src={flickrLogo}
                  />
                </div>
              }
            />
            <InfoCellWithScroll
              title="Gurushots"
              content={
                <TextLink
                  href="https://gurushots.com/georgegillams/photos"
                  external
                >
                  See my profile on Gurushots
                </TextLink>
              }
              aux={
                <div className={getClassName('contact__icon-image-container')}>
                  <img
                    className={getClassName(
                      'contact__icon-image',
                      'contact__icon-image--dark-invert',
                    )}
                    src={gurushotsLogo}
                  />
                </div>
              }
            />
            <br />
            <Button
              hrefExternal
              href="https://www.dropbox.com/s/aj9wjgotkldd18j/georgegillams.vcf?dl=1"
            >
              Download contact (iOS)
            </Button>
            <br />
            <br />
            <Button
              hrefExternal
              href="https://www.dropbox.com/s/k8hmxeh2qpjqx66/google.csv?dl=1"
            >
              Download contact (Android)
            </Button>
          </div>
        </Section>
      </div>
    );
  }
}

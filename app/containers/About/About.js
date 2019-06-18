import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import { TextLink, Section } from 'components/Typography';
import PhotoGallery from 'components/PhotoGallery';
// import contactFile from "./contact.vcf";

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class Contact extends Component {
  state = {};

  render() {
    return (
      <Section name="Hey! I'm George.">
        I&apos;m an open-source software engineer at{' '}
        <TextLink external href="https://www.skyscanner.net/">
          Skyscanner
        </TextLink>
        . I am passionate about design,{' '}
        <TextLink href="/travel">travel</TextLink> and{' '}
        <TextLink href="/photography">photography</TextLink>, for which I have
        an unsatisfiable hunger. When I&apos;m not internationally photobombing
        unsuspecting strangers I&apos;m based somewhere between Portsmouth and
        London.
        <br />
        <br />I enjoy getting outdoors and trying new things, and completed my
        5th <TextLink href="/blog/tough-mudder">Tough Mudder</TextLink> in May
        2018. I also try to squeeze in as much volunteering as I can, so you may
        find me dressed as a{' '}
        <TextLink external href="https://helpforheroes.org.uk/">
          Help for Heroes
        </TextLink>{' '}
        bear, reviewing content for{' '}
        <TextLink external href="https://b-eat.co.uk/">
          Beat
        </TextLink>
        , or submitting PR's to
        <TextLink external href="https://github.com/mozilla">
          Mozilla &apos;s open-source
        </TextLink>
        .
        <br />
        <br />I recently got engaged to my wonderful fiancée while we were in{' '}
        <TextLink href="/travel/iceland-2018">Iceland</TextLink> 💍, and live
        with her and Tigger the cat.
        <br />
        <br />
        <PhotoGallery
          className={getClassName('pages__photo-gallery')}
          images={[
            {
              src: 'https://i.imgur.com/EPfA1yI.png',
              altText: 'My fianceé and I',
            },
            {
              src: 'https://i.imgur.com/eldzRhk.jpg',
              altText: 'My fianceé and I',
            },
            {
              src: 'https://i.imgur.com/n8JZuqv.jpg',
              altText: 'Our cat, Tigger',
            },
            {
              src: 'https://i.imgur.com/mvvDmiL.jpg',
              altText: 'Group photo at Tough Mudder',
            },
          ]}
        />
        <br />
        <br />
        This site is built in React and hosted on Heroku where I have a Redis
        database provisioned. Redux is used to invoke API functions when pages
        are server-side rendered, and also when calls are made from the browser.
        <br />I use this site to experiment with things, share stuff I've
        figured out, and allow people to reach-out to me. So if you're
        interested in anything I do,{' '}
        <TextLink href="/contact">get in touch</TextLink>!
      </Section>
    );
  }
}

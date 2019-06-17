import React, { Component } from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from '../pages.scss';

import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class Work extends Component {
  state = {};

  render() {
    return (
      <div
        className={['pages__container', 'pages__container--prose']
          .map(getClassName)
          .join(' ')}
      >
        <Helmet title="Work" />
        <Section name="My Work">
          <SubSection name="Software Engineering Masters">
            I have a 1st class Masters in Software Engineering from the
            University of Southampton.
            <br />
            <br />
            <GGButton href="/work/degree">
              Information about my degree →
            </GGButton>
          </SubSection>
          <SubSection name="Work">
            I started my Software Engineering career at{' '}
            <TextLink
              href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
              external
            >
              Leonardo{' '}
            </TextLink>
            working on .NET frameworks for analysis tools.
            <br />I now work at Skyscanner, on their open-source design system,{' '}
            <TextLink href="https://backpack.github.io/" external>
              Backpack{' '}
            </TextLink>
          </SubSection>
          <Section name="Portfolio">
            <SubSection name="Party Parrot">
              As a developer and advocate for open source, having a contribution
              to the{' '}
              <TextLink external href="https://cultofthepartyparrot.com/">
                official Party Parrot repo{' '}
              </TextLink>{' '}
              was a proud moment.
              <br />
              <img
                width={60}
                src="https://cultofthepartyparrot.com/parrots/hd/opensourceparrot.gif"
              />
            </SubSection>
            <SubSection name="EPICC Conference">
              For a non-profit conference running in Southampton, I developed a
              website where delegates could reserve and pay for tickets. The
              website also allowed us to collect information needed from
              delegates, and a QR-code based ticket system was implemented to
              quickly register delegates when arriving at the conference.
              <br />
              <br />
              The stack was as follows: React front-end, Node backend, Redis DB,
              Stripe payment handling, Travis CI and Heroku deployment.
              <br />
              <br />
              The custom built solution allowed us to sell nearly 120 tickets,
              allowing delegates to manage their own tickets and allowing the
              conference committee to instantly admit users with valid tickets
              to the conference.
            </SubSection>
            <SubSection name="Backpack">
              <TextLink external href="https://backpack.github.io/">
                Backpack{' '}
              </TextLink>
              is Skyscanner's open-source design system which supports 4
              platforms (Android, iOS, React Native and Web). Our work which
              combines Design and Engineering in equal measures enables fast
              development and reduces effort duplication.
              <br />
              <br />
              <GGButton hrefExternal href="https://backpack.github.io/">
                Read more about Backpack here →
              </GGButton>
            </SubSection>
            <SubSection name="EWOS">
              In 2015, I joined the EWOS (Electronic Warfare Operational
              Support) team at{' '}
              <TextLink
                href="http://www.leonardocompany.com/en/-/ewos-electronic_warfare_operational_support"
                external
              >
                Leonardo{' '}
              </TextLink>
              . My work there involved maintaining large .NET frameworks which
              supported feature-rich mission analysis tools. Close collaboration
              with the hardware team and our consumers was essential and
              demanded a strong, agile approach to development. Thorough
              planning, in which we were all involved, was key to our success.
              Throughout some 60 weeks there, I immensely improved my ability to
              navigate large codebases and to produce readable, manageable code
              myself.
            </SubSection>
          </Section>
        </Section>
      </div>
    );
  }
}

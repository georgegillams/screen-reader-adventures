import React from 'react';
import Helmet from 'react-helmet';
import {
  Section,
  SubSection,
  TextLink,
  Paragraph,
} from 'gg-components/Typography';
import Image from 'components/Image';
import { Button } from 'gg-components/Button';
import { setPlatform } from 'helpers/storageHelpers';
import VoiceOverWelcome from './VoiceOverWelcome.png';
import VoiceOverWelcome_light from './VoiceOverWelcome_light.png';
import VoiceOverSafari from './VoiceOverSafari.png';
import VoiceOverSafari_light from './VoiceOverSafari_light.png';

import STYLES from '../pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

class SetupIos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    setPlatform('macOS');
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Setup VoiceOver on macOS" />
        <Section name="Setup VoiceOver on macOS">
          <Paragraph>
            To start open Safari. VoiceOver works best when you use Apple&apos;s
            own browser.
          </Paragraph>
          <br />
          <br />
          <Image
            className={getClassName('pages__image')}
            altText={'VoiceOver welcome screen'}
            width={991}
            height={517}
            lightSrc={VoiceOverWelcome_light}
            darkSrc={VoiceOverWelcome}
          />
          <Paragraph>
            To enable VoiceOver, hold command and press F5. (if you have a
            TouchBar device, you can press the power button 3 times to bring up
            accessibility options.)
          </Paragraph>
          <br />
          <br />
          <Paragraph>
            You&apos;ll see that the webpage has been highlighted with a black
            and white box, and VoiceOver is telling you about it. If this
            doesn&apos;t happen, click the webpage anywhere to select it.
          </Paragraph>
          <br />
          <br />
          <Image
            className={getClassName('pages__image')}
            altText={'VoiceOver on Safari'}
            width={2936}
            height={1586}
            lightSrc={VoiceOverSafari_light}
            darkSrc={VoiceOverSafari}
          />
          <Paragraph>
            VoiceOver navigation is 3D, meaning you can move out to large
            elements (eg an entire app) or in to more specifics (eg an
            individual character of a word). To move into the structure of the
            page, hold shift+ctrl+option and press down. To move between
            elements within the page hold shift+ctrl+option and tap the left and
            right keys.
          </Paragraph>
          <br />
          <br />
          <Paragraph>
            Generally, up and down is used to move out of the current container,
            or move deeper into the content. Left and right are used to switch
            between elements and controls at the same level.
          </Paragraph>
          <br />
          <br />
          <Paragraph>
            Once you&apos;ve got the button below selected. Press
            ctrl+option+space to activate it. Don&apos;t worry if you forget
            this. VoiceOver tends to help you out as you go!
          </Paragraph>
          <br />
          <br />
          <Button
            className={getClassName('pages__component')}
            large
            href="/level/1"
          >
            I&apos;m ready to play...
          </Button>
        </Section>
      </div>
    );
  }
}

export default SetupIos;

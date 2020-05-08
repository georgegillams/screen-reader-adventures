import React from 'react';
import Helmet from 'react-helmet';
import {
  PageTitle,
  SubSection,
  TextLink,
  Paragraph,
} from 'gg-components/Typography';
import { Checkbox } from 'gg-components/Checkbox';
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

    this.state = { checkboxChecked: false };
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
        <PageTitle
          link={{ text: 'Change platform', to: '/' }}
          name="Setup VoiceOver on macOS"
        >
          <Paragraph>
            To start, open Safari. VoiceOver works best when you use
            Apple&apos;s own browser.
          </Paragraph>
          <br />
          <br />
          <Paragraph>
            To enable VoiceOver, hold cmd and press F5. (if you have a TouchBar
            device, you can press the power button 3 times to bring up
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
          <SubSection name="Navigation">
            <Paragraph>
              VoiceOver navigation is 3D, meaning you can move inwards to
              specific elements (right down to an individual character of a
              word). To move into the structure of the page, hold
              shift+ctrl+option and press down. You&apos;ll notice that the menu
              button is now selected.
            </Paragraph>
            <br />
            <br />
            <Paragraph>
              To move between elements within an area of the page, hold
              ctrl+option and tap the left and right keys. If you press
              ctrl+option+right 3 times, you&apos;ll be on the main web content.
            </Paragraph>
            <br />
            <br />
            <Paragraph>
              Again, to move into the main content we must use
              shift+ctrl+option+down. Once we&apos;re inside the main content,
              we can navigate around it using ctrl+option+left/right.
            </Paragraph>
            <br />
            <br />
            <Paragraph>
              Spend some time on this page getting familiar with how to navigate
              between elements. Try going down into an element until you are
              navigating between individaul charaters, then try coming up again.
            </Paragraph>
          </SubSection>
          <SubSection name="Interaction">
            <Paragraph>
              When you move onto a button element, VoiceOver will read out the
              title, and that the element is a button. If the button is
              disabled, it will also tell you that it&apos;s "dimmed".
            </Paragraph>
            <br />
            <br />
            <Paragraph>
              To "click" an interactive element using VoiceOver, we press
              cmd+option+space. Give that a go on the button below.
            </Paragraph>
            <br />
            <br />
            <Button className={getClassName('pages__component')} large>
              Example
            </Button>
            <br />
            <br />
            <Button className={getClassName('pages__component')} large disabled>
              Example
            </Button>
            <br />
            <br />
            <Paragraph>
              The experience is similar for other standary UI elements too.
            </Paragraph>
            <br />
            <br />
            <Checkbox
              label={'Example'}
              checked={this.state.checkbox1Checked}
              onChange={event => {
                this.setState({ checkbox1Checked: event.target.checked });
              }}
            />
            <br />
            <br />
            <Checkbox
              label={'Example'}
              checked={this.state.checkbox2Checked}
              enabled={false}
              onChange={event => {
                this.setState({ checkbox2Checked: event.target.checked });
              }}
            />
          </SubSection>
          <Button
            className={getClassName('pages__component')}
            large
            href="/level/1"
          >
            I&apos;m ready to play...
          </Button>
        </PageTitle>
      </div>
    );
  }
}

export default SetupIos;

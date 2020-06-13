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
import { getCopy } from 'helpers/copyHelpers';
import VoiceOverWelcome from './VoiceOverWelcome.png';
import VoiceOverWelcome_light from './VoiceOverWelcome_light.png';
import VoiceOverSafari from './VoiceOverSafari.png';
import VoiceOverSafari_light from './VoiceOverSafari_light.png';

import STYLES from '../pages.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
const getClassName = cssModules(STYLES);

class SetupMacos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
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
          link={{ text: 'Adjust settings', to: '/settings/macOS' }}
          name="Setup VoiceOver on macOS"
        >
          <Paragraph>{getCopy('setup1')}</Paragraph>
          <br />
          <br />
          <Paragraph>{getCopy('setup2')}</Paragraph>
          <br />
          <br />
          <Paragraph>{getCopy('setup3')}</Paragraph>
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
            <Paragraph>{getCopy('setup4')}</Paragraph>
            <br />
            <br />
            <Paragraph>{getCopy('setup5')}</Paragraph>
            <br />
            <br />
            <Paragraph>{getCopy('setup6')}</Paragraph>
            <br />
            <br />
            <Paragraph>{getCopy('setup7')}</Paragraph>
          </SubSection>
          <SubSection name="Interaction">
            <Paragraph>{getCopy('setup8')}</Paragraph>
            <br />
            <br />
            <Paragraph>{getCopy('setup9')}</Paragraph>
            <br />
            <br />
            <Button className={getClassName('pages__component')} large>
              {getCopy('setupExampleElementLabel')}
            </Button>
            <br />
            <br />
            <Button className={getClassName('pages__component')} large disabled>
              {getCopy('setupExampleElementLabel')}
            </Button>
            <br />
            <br />
            <Paragraph>
              The experience is similar for other standary UI elements too.
            </Paragraph>
            <br />
            <br />
            <Checkbox
              label={getCopy('setupExampleElementLabel')}
              checked={this.state.checkbox1Checked}
              onChange={event => {
                this.setState({ checkbox1Checked: event.target.checked });
              }}
            />
            <br />
            <br />
            <Checkbox
              label={getCopy('setupExampleElementLabel')}
              checked={this.state.checkbox2Checked}
              disabled
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
            {getCopy('setupCTA')}
          </Button>
        </PageTitle>
      </div>
    );
  }
}

export default SetupMacos;

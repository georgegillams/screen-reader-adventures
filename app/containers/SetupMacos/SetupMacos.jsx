import React from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { Section, SubSection, TextLink } from 'components/Typography';
import GGButton from 'components/GGButton';

import STYLES from '../pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

class SetupIos extends React.Component {
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
        <Section name="Setup VoiceOver on macOS">
          Instructions coming soon
        </Section>
        <GGButton large href="/level/1">
          I&apos;m ready to play...
        </GGButton>
      </div>
    );
  }
}

export default SetupIos;

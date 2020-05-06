import React from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { setPlatform } from 'helpers/storageHelpers';
import { Section, SubSection, TextLink } from 'gg-components/Typography';
import { Button } from 'gg-components/Button';

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

  componentDidMount() {
    setPlatform('Android');
  }

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Setup TalkBack on Android" />
        <Section name="Setup TalkBack on Android">
          Instructions coming soon
        </Section>
        <Button large href="/level/1">
          I&apos;m ready to play...
        </Button>
      </div>
    );
  }
}

export default SetupIos;

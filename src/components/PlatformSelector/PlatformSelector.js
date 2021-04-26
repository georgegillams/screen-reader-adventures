import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'gg-components/Paragraph';
import FeatureCard, { FEATURE_CARD_LAYOUTS } from 'components/common/FeatureCard';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './platform-selector.scss';

const getClassName = cssModules(STYLES);

const PlatformSelector = props => {
  const { ...rest } = props;

  return (
    <div {...rest}>
      <div className={getClassName('platform-selector__card-container')}>
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('platform-selector__card')}
          href="/settings/macOS"
          title="macOS">
          <Paragraph>Select to learn with VoiceOver for macOS</Paragraph>
        </FeatureCard>
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('platform-selector__card')}
          disabled
          title="iOS">
          <Paragraph>Coming later…</Paragraph>
        </FeatureCard>
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('platform-selector__card')}
          disabled
          title="Android">
          <Paragraph>Coming later…</Paragraph>
        </FeatureCard>
        <FeatureCard
          layout={FEATURE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('platform-selector__card')}
          disabled
          title="Windows">
          <Paragraph>Coming later…</Paragraph>
        </FeatureCard>
      </div>
    </div>
  );
};

PlatformSelector.propTypes = {
  ticketTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PlatformSelector;

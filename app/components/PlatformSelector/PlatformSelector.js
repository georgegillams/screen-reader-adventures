import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'gg-components/Typography';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

const PlatformSelector = props => {
  const { ...rest } = props;

  return (
    <div className={getClassName('pages__container')} {...rest}>
      <div className={getClassName('pages__compact-card-container')}>
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          linkUrl="/setup/iOS"
          title="iOS"
        >
          <Paragraph>Select to learn with VoiceOver for iOS</Paragraph>
        </ArticleCard>
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          linkUrl="/setup/macOS"
          title="macOS"
        >
          <Paragraph>Select to learn with VoiceOver for macOS</Paragraph>
        </ArticleCard>
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          linkUrl="/setup/Android"
          title="Android"
        >
          <Paragraph>Select to learn with TalkBack for Android</Paragraph>
        </ArticleCard>
      </div>
    </div>
  );
};

PlatformSelector.propTypes = {
  ticketTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PlatformSelector;

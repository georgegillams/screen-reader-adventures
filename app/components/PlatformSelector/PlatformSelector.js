import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'gg-components/Typography';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'gg-components/helpers/cssModules';
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
          linkUrl="/settings/macOS"
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
          disabled
          title="iOS"
        >
          <Paragraph>Coming later…</Paragraph>
        </ArticleCard>
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          disabled
          title="Android"
        >
          <Paragraph>Coming later…</Paragraph>
        </ArticleCard>
        <ArticleCard
          layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          disabled
          title="Windows"
        >
          <Paragraph>Coming later…</Paragraph>
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

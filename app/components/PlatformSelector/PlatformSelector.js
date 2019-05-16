import React from 'react';
import PropTypes from 'prop-types';
import { CodeInline } from 'components/Code';
import { SubSection } from 'components/Typography';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import { getPriceForTicketType, beautifyTicketType } from 'helpers/ticketing';
import { setPlatform } from 'helpers/storageHelpers';
import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

const PlatformSelector = props => {
  const { ...rest } = props;

  const onSelect = selected => {
    setPlatform(selected);
    window.location = `/setup/${selected}`;
  };

  return (
    <div className={getClassName('pages__container')} {...rest}>
      <div className={getClassName('pages__compact-card-container')}>
        <ArticleCard
          layout={CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('iOS');
          }}
          title="iOS"
        >
          Select to learn with VoiceOver for iOS
        </ArticleCard>
        <ArticleCard
          layout={CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('macOS');
          }}
          title="macOS"
        >
          Select to learn with VoiceOver for macOS
        </ArticleCard>
        <ArticleCard
          layout={CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('Android');
          }}
          title="Android"
        >
          Select to learn with TalkBack for Android
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

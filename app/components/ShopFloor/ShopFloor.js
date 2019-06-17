import React from 'react';
import PropTypes from 'prop-types';

import { CodeInline } from 'components/Code';
import { SubSection } from 'components/Typography';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import { getPriceForTicketType, beautifyTicketType } from 'helpers/ticketing';

const ShopFloor = props => {
  const { ticketTypes, selectedTicket, onSelect, ...rest } = props;
  if (!ticketTypes) {
    return <SubSection noAnchor name="All tickets sold out. Sorry 😢" />;
  }
  const {
    EB_ONE_DAY: ebOneDayCount,
    EB_TWO_DAY: ebTwoDayCount,
    R_ONE_DAY: regularOneDayCount,
    R_TWO_DAY: regularTwoDayCount,
    EB_ONE_DAY_UNPAID: ebOneDayCountUnpaid,
    EB_TWO_DAY_UNPAID: ebTwoDayCountUnpaid,
    R_ONE_DAY_UNPAID: regularOneDayCountUnpaid,
    R_TWO_DAY_UNPAID: regularTwoDayCountUnpaid,
  } = ticketTypes;

  const allTicketsReserved =
    ebOneDayCount + ebTwoDayCount + regularOneDayCount + regularTwoDayCount < 1;
  const unpaidTicketCount =
    ebOneDayCountUnpaid +
    ebTwoDayCountUnpaid +
    regularOneDayCountUnpaid +
    regularTwoDayCountUnpaid;
  const unpaidTickets = unpaidTicketCount > 0;

  return (
    <div className={getClassName('pages__container')} {...rest}>
      {allTicketsReserved && unpaidTickets && (
        <SubSection noAnchor name="All tickets are sold or reserved." />
      )}
      {allTicketsReserved && !unpaidTickets && (
        <SubSection noAnchor name="All tickets have now been purchased." />
      )}
      {allTicketsReserved && unpaidTickets && (
        <SubSection
          noAnchor
          name={`Note that ${
            unpaidTicketCount < 2
              ? '1 ticket'
              : `up to ${unpaidTicketCount} tickets`
          } may be re-released for purchase within the next hour. Please check back regularly.`}
        />
      )}
      <div className={getClassName('pages__compact-card-container')}>
        <ArticleCard
          disabled={ebOneDayCount <= 0}
          highlighted={selectedTicket === 'EB_ONE_DAY'}
          layout={CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('EB_ONE_DAY');
          }}
          title={`${beautifyTicketType('EB_ONE_DAY')} (£${getPriceForTicketType(
            'EB_ONE_DAY',
          ) / 100})`}
        >
          {ebOneDayCount > 0 ? `${ebOneDayCount} remaining` : 'Sold out'}
        </ArticleCard>
        <ArticleCard
          disabled={ebTwoDayCount <= 0}
          layout={CARD_LAYOUTS.narrowCompact}
          highlighted={selectedTicket === 'EB_TWO_DAY'}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('EB_TWO_DAY');
          }}
          title={`${beautifyTicketType('EB_TWO_DAY')} (£${getPriceForTicketType(
            'EB_TWO_DAY',
          ) / 100})`}
        >
          {ebTwoDayCount > 0 ? `${ebTwoDayCount} remaining` : 'Sold out'}
        </ArticleCard>
        <ArticleCard
          disabled={regularOneDayCount <= 0 || ebOneDayCount > 0}
          highlighted={selectedTicket === 'R_ONE_DAY'}
          layout={CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('R_ONE_DAY');
          }}
          title={`${beautifyTicketType('R_ONE_DAY')} (£${getPriceForTicketType(
            'R_ONE_DAY',
          ) / 100})`}
        >
          {regularOneDayCount > 0
            ? `${regularOneDayCount} remaining`
            : 'Sold out'}
        </ArticleCard>
        <ArticleCard
          disabled={regularTwoDayCount <= 0 || ebTwoDayCount > 0}
          highlighted={selectedTicket === 'R_TWO_DAY'}
          layout={CARD_LAYOUTS.narrowCompact}
          day={null}
          month={null}
          className={getClassName('pages__card')}
          // fillImageSrc="https://i.imgur.com/3n68rkf.jpg"
          onClick={() => {
            onSelect('R_TWO_DAY');
          }}
          title={`${beautifyTicketType('R_TWO_DAY')} (£${getPriceForTicketType(
            'R_TWO_DAY',
          ) / 100})`}
        >
          {regularTwoDayCount > 0
            ? `${regularTwoDayCount} remaining`
            : 'Sold out'}
        </ArticleCard>
      </div>
    </div>
  );
};

ShopFloor.propTypes = {
  ticketTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ShopFloor;

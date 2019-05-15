import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';

import STYLES from './status-card.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

const StatusCard = props => {
  const { data, overallStatus, className, ...rest } = props;

  const classNameFinal = [getClassName('status-card__container')];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <ArticleCard
        layout={CARD_LAYOUTS.narrowCompact}
        className={getClassName("status-card__card")}
      >
        <div className={getClassName("status-card__content-items")}>
          {data &&
            data.map(dataItem => (
              <div className={getClassName("status-card__content-item")}>
                <Status
                  type={dataItem.status}
                  className={getClassName("status-card__content-item-status")}
                />
                {dataItem.item}
                <br />
                <br />
              </div>
            ))}
        </div>
      </ArticleCard>
      <Status
        shadow
        type={overallStatus}
        large
        className={getClassName("status-card__status")}
      />
    </div>
  );
};

StatusCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  overallStatus: PropTypes.string.isRequired,
  className: PropTypes.string,
};

StatusCard.defaultProps = {
  className: null,
};

export default StatusCard;

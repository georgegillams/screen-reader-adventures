import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'gg-components/Paragraph';
import Card from 'components/common/Card';
import DebugObject from 'components/common/DebugObject';

const AnalyticEntity = props => {
  const { entity, children, ...rest } = props;

  return (
    <Card {...rest}>
      <div>
        <Paragraph>
          {entity.url}
          {entity.count && (
            <>
              <br />
              Instances: {entity.count}
            </>
          )}
          {entity.browser && (
            <>
              <br />
              Browser {entity.browser} {entity.browserVersion}
            </>
          )}
          {entity.os && (
            <>
              <br />
              os {entity.os}
            </>
          )}
          {entity.ipAddressPrefix && (
            <>
              <br />
              IP address prefix {entity.ipAddressPrefix}
            </>
          )}
          {entity.utm_source && (
            <>
              <br />
              Source {entity.utm_source}
            </>
          )}
          {entity.utm_medium && (
            <>
              <br />
              Medium {entity.utm_medium}
            </>
          )}
        </Paragraph>
        <DebugObject debugTitle="Analytic" debugObject={entity} />
        {children && children}
      </div>
    </Card>
  );
};

AnalyticEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object,
  children: PropTypes.node,
};

AnalyticEntity.defaultProps = {
  entity: null,
  children: null,
};

export default AnalyticEntity;

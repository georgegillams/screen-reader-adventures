import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'gg-components/Cards';
import { Paragraph, PageTitle } from 'gg-components/Typography';
import { DebugObject } from 'gg-components/Auth';

const AnalyticEntity = props => {
  const { entity, children, ...rest } = props;

  return (
    <Card {...rest}>
      <PageTitle name={entity.url}>
        {entity.count && (
          <>
            <Paragraph>Matches: {entity.count}</Paragraph>
            <br />
          </>
        )}
        {entity.browser && (
          <>
            <Paragraph>Browser {entity.browser}</Paragraph>
            <br />
          </>
        )}
        {entity.os && (
          <>
            <Paragraph>os {entity.os}</Paragraph>
            <br />
          </>
        )}
        {entity.url && (
          <>
            <Paragraph>Path {entity.url}</Paragraph>
            <br />
          </>
        )}
        {entity.utm_source && (
          <>
            <Paragraph>Source {entity.utm_source}</Paragraph>
            <br />
          </>
        )}
        {entity.utm_medium && (
          <>
            <Paragraph>Medium {entity.utm_medium}</Paragraph>
            <br />
          </>
        )}
        <DebugObject debugTitle="Analytic" debugObject={entity} />
        {children && children}
      </PageTitle>
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

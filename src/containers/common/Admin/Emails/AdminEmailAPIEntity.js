import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'gg-components/Paragraph';
import { Subsection } from 'gg-components/Subsection';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import { cssModules } from 'gg-components/helpers/cssModules';
import STYLES from './admin-emails.scss';

const getClassName = cssModules(STYLES);

const AdminEmailAPIEntity = props => {
  const { compact, entity, children, ...rest } = props;

  const content = (
    <Subsection anchor={false} padding={!compact} name={entity.subject || `Email ${entity.id}`}>
      <Paragraph>
        {compact && <br />}
        id: {entity.id}
        {!compact && (
          <>
            {entity.deleted && (
              <>
                <br />
                DELETED
              </>
            )}
            <br />
            to: {entity.to}
            <br />
            from: {entity.from}
            <br />
            <br />
            text: {entity.text}
          </>
        )}
      </Paragraph>
      {!compact && (
        <div
          className={getClassName('admin-emails__preview')}
          dangerouslySetInnerHTML={{
            __html: entity.html,
          }}
        />
      )}
      {!compact && children && children}
    </Subsection>
  );

  if (compact) {
    return (
      <SplitDetailItem id={entity.id} {...rest}>
        {content}
      </SplitDetailItem>
    );
  }
  return (
    <div id={entity.id} {...rest}>
      {content}
    </div>
  );
};

AdminEmailAPIEntity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
  children: PropTypes.node,
  compact: PropTypes.bool,
};

AdminEmailAPIEntity.defaultProps = {
  children: null,
  compact: false,
};

export default AdminEmailAPIEntity;

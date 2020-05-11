import React from 'react';
import PropTypes from 'prop-types';
import { PageTitle } from 'gg-components/Typography';

const PageTitleWrapper = props => {
  const { link, ...rest } = props;
  const hasLink = !!link;

  return (
    <PageTitle
      link={link}
      headingProps={hasLink ? {} : { id: 'autoFocus' }}
      linkProps={hasLink ? { id: 'autoFocus' } : {}}
      {...rest}
    />
  );
};

PageTitleWrapper.propTypes = {
  ticketTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PageTitleWrapper;

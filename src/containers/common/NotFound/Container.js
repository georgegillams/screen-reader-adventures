import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Subsection } from 'gg-components/Subsection';
import { Paragraph } from 'gg-components/Paragraph';
import PageTitle from 'components/common/PageTitle';
import TextLink from 'components/common/TextLink';

import STYLES from './not-found.scss';

const getClassName = cssModules(STYLES);

const NotFound = props => {
  const { className } = props;
  const classNameFinal = [getClassName('not-found__container')];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <div className={classNameFinal.join(' ')}>
      <PageTitle className={getClassName('not-found__container')} name="Oops." pageTitle="404">
        <Subsection anchor={false}>
          <Paragraph>
            The page you&apos;re looking for doesn&apos;t exist, or you don&apos;t have permission to view it.
            <br />
            Maybe the <TextLink href={'/sitemap'}>site map</TextLink> can help
          </Paragraph>
        </Subsection>
      </PageTitle>
    </div>
  );
};

NotFound.propTypes = {
  className: PropTypes.string,
};

NotFound.defaultProps = {
  className: null,
};

export default NotFound;

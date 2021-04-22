import React from 'react';
import PropTypes from 'prop-types';
import { PageTitle as GGPageTitle } from 'gg-components/PageTitle';
import TextLink from 'components/common/TextLink';
import Head from 'next/head';
import appConfig from 'helpers/appConfig';

const PageTitle = props => {
  const { link, name, pageTitle, ...rest } = props;

  let result = null;
  if (!link) {
    result = <GGPageTitle name={name} {...rest} />;
  } else {
    result = (
      <GGPageTitle
        name={name}
        link={link}
        renderLink={(linkHref, linkName, linkClassName) => {
          return (
            <TextLink href={linkHref} className={linkClassName}>
              {linkName}
            </TextLink>
          );
        }}
        {...rest}
      />
    );
  }

  const pageTitleFinal = `${pageTitle || name} - ${appConfig.projectTitle}`;

  return (
    <>
      <Head>
        <title>{pageTitleFinal}</title>
        <meta key="og:title" name="og:title" content={pageTitleFinal} />
      </Head>
      {result}
    </>
  );
};

PageTitle.propTypes = {
  link: PropTypes.object,
  name: PropTypes.string.isRequired,
  pageTitle: PropTypes.string,
};

PageTitle.defaultProps = {
  link: null,
  pageTitle: null,
};

export default PageTitle;

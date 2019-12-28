import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { cssModules } from 'bpk-react-utils';

import BlogListSkeleton from './BlogListSkeleton';
import STYLES from './blogs-page.scss';

import { LoadingCover } from 'gg-components/dist/Auth';
import {Button} from 'gg-components/dist/Button';
import BlogsList from 'components/Blogs';
import PAGE_STYLES from 'containers/pages.scss';

const getClassName = cssModules({ ...PAGE_STYLES, ...STYLES }); // REGEX_REPLACED

export default class BlogsNav extends React.Component {
  render() {
    const { selected, className, ...rest } = this.props;
    const outerClassNameFinal = [getClassName('blogs-page__navigation')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Button
          white={selected !== 'Writing'}
          href="/blog"
          style={{ marginRight: '1rem' }}
          aria-selected={selected === 'Writing' ? 'true' : null}
          role="tab"
        >
          Writing
        </Button>
        <Button
          aria-selected={selected === 'Travel' ? 'true' : null}
          role="tab"
          white={selected !== 'Travel'}
          href="/travel"
        >
          Travel
        </Button>
      </div>
    );
  }
}

BlogsNav.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
};

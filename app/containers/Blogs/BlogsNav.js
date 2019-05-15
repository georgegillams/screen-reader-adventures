import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import { LoadingCover } from 'components/Auth';
import GGButton from 'components/GGButton';
import BlogsList from 'components/Blogs';
import BlogListSkeleton from './BlogListSkeleton';
import PAGE_STYLES from 'containers/pages.scss';
import STYLES from './blogs-page.scss';
import { cssModules } from 'bpk-react-utils';
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
        <GGButton
          white={selected !== 'Writing'}
          href="/blog"
          style={{ marginRight: '1rem' }}
          aria-selected={selected === 'Writing' ? 'true' : null}
          role="tab"
        >
          Writing
        </GGButton>
        <GGButton
          aria-selected={selected === 'Travel' ? 'true' : null}
          role="tab"
          white={selected !== 'Travel'}
          href="/travel"
        >
          Travel
        </GGButton>
      </div>
    );
  }
}

BlogsNav.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
};

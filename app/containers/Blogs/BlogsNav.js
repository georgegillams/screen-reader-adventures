import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Button } from 'gg-components/Button';

import STYLES from './blogs-page.scss';

import PAGE_STYLES from 'containers/pages.scss';

const getClassName = cssModules({ ...PAGE_STYLES, ...STYLES });

const BlogsNav = props => {
  const { selected, className } = props;
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
};

BlogsNav.propTypes = {
  selected: PropTypes.string,
  className: PropTypes.string,
};

BlogsNav.defaultProps = {
  selected: 'Writing',
  className: null,
};

export default BlogsNav;

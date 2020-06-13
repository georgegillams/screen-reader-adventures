import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { PageTitle } from 'gg-components/Typography';
import { Card } from 'gg-components/Cards';
import { Button } from 'gg-components/Button';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/Auth';

import Skeleton from './Skeleton';

import { BlogCard } from 'components/Blogs';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class AdminBlogs extends React.Component {
  componentDidMount = () => {
    this.props.loadBlogs();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      loadBlogs,
      blogs,
      loading,
      success,
      error,
      deleteBlog,
      deleting,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/blog')}
        >
          <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin - blog">
            <Button
              className={getClassName('pages__component')}
              large
              href="/admin/blog/create"
            >
              Create blog
            </Button>
            {blogs &&
              blogs.map &&
              blogs.map(b => (
                <Card
                  className={getClassName(
                    'pages__component',
                    'pages__bpk-card',
                  )}
                >
                  <APIEntity name="more" entityType="Blog" entity={b} />
                  <BlogCard linkPrefix="/admin/blog/edit" blog={b} />
                  <Button
                    large
                    destructive
                    disabled={deleting}
                    onClick={() => deleteBlog(b)}
                  >
                    Delete
                  </Button>
                </Card>
              ))}
          </PageTitle>
        </AdminOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Admin - blogs" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!blogs && loading)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin blogs"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadBlogs,
            blogs,
            loading,
            success,
            error,
          }}
        />
      </>
    );
  }
}

AdminBlogs.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  deleting: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

AdminBlogs.defaultProps = {
  blogs: null,
  error: null,
  success: false,
  loading: false,
  className: null,
  deleting: false,
  user: null,
  userLoading: false,
};

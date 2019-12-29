import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Card from 'bpk-component-card';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import { BlogCard } from 'components/Blogs';
import { Button } from 'gg-components/dist/Button';
import { Section } from 'gg-components/dist/Typography';
import FormBuilder from 'components/Forms';
import { ID_REGEX } from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/dist/Auth';
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
      ...rest
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/blog')}
        >
          <Section name="Admin - blog">
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
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

AdminBlogs.propTypes = {
  createBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loadBlogs: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  creatingBlog: PropTypes.bool,
  deleting: PropTypes.bool,
  loggingIn: PropTypes.bool,
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
  creatingBlog: false,
  deleting: false,
  loggingIn: false,
  user: null,
  userLoading: false,
};

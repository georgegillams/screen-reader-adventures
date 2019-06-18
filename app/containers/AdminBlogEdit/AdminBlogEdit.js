import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import LoadingIndicator from 'components/LoadingIndicator';
import BlogsList from 'components/Blogs';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import GGButton from 'components/GGButton';
import { Section, SubSection, TextLink } from 'components/Typography';
import CodeInline from 'components/Code';
import Ticket from 'components/Ticket';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
import { CreateBlogForm } from 'components/Forms';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class AdminBlogEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newBlog: null };
  }

  componentDidMount = () => {
    const blogId = this.props.match.params.id;
    if (blogId) {
      this.props.loadBlog(blogId);
    }
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      loadBlog,
      updateBlog,
      createBlog,
      blog,
      loading,
      success,
      error,
      updating,
      updateSuccess,
      updateError,
      creating,
      createSuccess,
      createError,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

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
            <CreateBlogForm
              disabled={updating || creating || !this.state.newBlog}
              blog={this.state.newBlog || blog || {}}
              onDataChanged={n => this.setState({ newBlog: n })}
              onSubmit={() => {
                if (blog) {
                  updateBlog(this.state.newBlog);
                } else {
                  createBlog(this.state.newBlog);
                }
              }}
              submitLabel={blog ? 'Update blog' : 'Create blog'}
            />
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - blog" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || loading}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin blog"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadBlog,
            updateBlog,
            createBlog,
            blog,
            loading,
            success,
            error,
            updating,
            updateSuccess,
            updateError,
            creating,
            createSuccess,
            createError,
          }}
        />
      </Fragment>
    );
  }
}

AdminBlogEdit.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

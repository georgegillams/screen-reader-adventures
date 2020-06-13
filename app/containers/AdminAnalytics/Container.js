import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/Input';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Button } from 'gg-components/Button';
import { Paragraph, PageTitle } from 'gg-components/Typography';
import { DebugObject, AdminOnly, LoadingCover } from 'gg-components/Auth';

import AnalyticEntity from './AnalyticEntity';
import Skeleton from './Skeleton';

import HelperFunctions from 'helpers/HelperFunctions';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

const expandAll = () => {
  const allElements = document.getElementsByTagName('DIV');
  for (let i = 0; i < allElements.length; i += 1) {
    const element = allElements[i];
    if (HelperFunctions.includes(element.textContent, '▶️ ')) {
      element.click();
    }
  }
};

export default class AdminAnalytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterURL: null,
      filterUTMSource: null,
      filterUTMMedium: null,
      filterOwner: null,
    };
  }

  componentDidMount = () => {
    this.props.loadAnalytics();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      analytics,
      loadAnalytics,
      loadingAnalytics,
      loadAnalyticsSuccess,
      loadAnalyticsError,
    } = this.props;
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let filteredAnalytics = analytics;
    if (filteredAnalytics) {
      if (this.state.filterURL) {
        filteredAnalytics = filteredAnalytics.filter(
          x => x.url && HelperFunctions.includes(x.url, this.state.filterURL),
        );
      }
      if (this.state.filterUTMSource) {
        filteredAnalytics = filteredAnalytics.filter(
          x =>
            x.utm_source &&
            HelperFunctions.includes(x.utm_source, this.state.filterUTMSource),
        );
      }
      if (this.state.filterUTMMedium) {
        filteredAnalytics = filteredAnalytics.filter(
          x =>
            x.utm_medium &&
            HelperFunctions.includes(x.utm_medium, this.state.filterUTMMedium),
        );
      }
      if (this.state.filterOwner) {
        filteredAnalytics = filteredAnalytics.filter(
          x =>
            x.ownerUname &&
            HelperFunctions.includes(x.ownerUname, this.state.filterOwner),
        );
      }
    }

    const showAnalytics =
      !!filteredAnalytics &&
      !!filteredAnalytics.length &&
      !!filteredAnalytics.map;

    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/analytic')}
        >
          <PageTitle
            link={{ to: '/admin', text: 'Admin' }}
            name="Admin - analytics"
          >
            <Button onClick={() => loadAnalytics()} large>
              Reload analytics
            </Button>
            <br />
            <br />
            {analytics && (
              <>
                <label htmlFor="filterURL">Filter by URL</label>
                <Input
                  id="filterURL"
                  name="Filter by category"
                  value={this.state.filterURL}
                  onChange={event => {
                    this.setState({ filterURL: event.target.value });
                  }}
                />
                <br />
                <br />
                <label htmlFor="filterUTMSource">Filter by UTM source</label>
                <Input
                  id="filterUTMSource"
                  name="Filter by family"
                  value={this.state.filterUTMSource}
                  onChange={event => {
                    this.setState({ filterUTMSource: event.target.value });
                  }}
                />
                <br />
                <br />
                <label htmlFor="filterUTMMedium">Filter by UTM medium</label>
                <Input
                  id="filterUTMMedium"
                  name="Filter by family"
                  value={this.state.filterUTMMedium}
                  onChange={event => {
                    this.setState({ filterUTMMedium: event.target.value });
                  }}
                />
                <br />
                <br />
                <label htmlFor="filterOwner">Filter by owner</label>
                <Input
                  id="filterOwner"
                  name="Filter by owner"
                  value={this.state.filterOwner}
                  onChange={event => {
                    this.setState({ filterOwner: event.target.value });
                  }}
                />
                <br />
                <br />
                <Paragraph>
                  Showing {filteredAnalytics.length} of {analytics.length}{' '}
                  analytics
                </Paragraph>
                <br />
                <br />
                <Button onClick={expandAll} large>
                  Expand all entities
                </Button>
                <br />
                <br />
                {showAnalytics &&
                  filteredAnalytics.map(n => (
                    <AnalyticEntity
                      entity={n}
                      className={getClassName('pages__component')}
                    />
                  ))}
              </>
            )}
          </PageTitle>
        </AdminOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Admin - analytics" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!analytics && loadingAnalytics)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin analytics"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadAnalytics,
            analytics,
            loadingAnalytics,
            loadAnalyticsSuccess,
            loadAnalyticsError,
          }}
        />
      </>
    );
  }
}

AdminAnalytics.propTypes = {
  loadAnalytics: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  analytics: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  loadAnalyticsError: PropTypes.object,
  loadAnalyticsSuccess: PropTypes.bool,
  loadingAnalytics: PropTypes.bool,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

AdminAnalytics.defaultProps = {
  analytics: null,
  loadAnalyticsError: null,
  loadAnalyticsSuccess: false,
  loadingAnalytics: false,
  className: null,
  user: null,
  userLoading: false,
};

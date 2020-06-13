import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Section,
  Paragraph,
  PageTitle,
  SubSection,
} from 'gg-components/Typography';
import { Select, Input } from 'gg-components/Input';
import { Helmet } from 'react-helmet';
import { cssModules } from 'gg-components/helpers/cssModules';
import queryString from 'query-string';
import { Button } from 'gg-components/Button';
import { Card } from 'gg-components/Cards';
import { DebugObject, AdminOnly, LoadingCover } from 'gg-components/Auth';
import { Checkbox } from 'gg-components/Checkbox';

import Skeleton from './Skeleton';
import AdminUsersAPIEntity from './AdminUsersAPIEntity';

import { SplitDetailView } from 'components/SplitDetailView';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class AdminUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      highlightId: null,
      showFilters: false,
      filterDeleted: true,
      filterAdminStatus: 'all',
      filterEmailVerified: 'all',
      filterName: '',
    };
  }

  componentDidMount = () => {
    this.props.loadUsers();
  };

  setHighlightId = highlightId => {
    if (this.state.highlightId !== highlightId) {
      this.setState({ highlightId });
    }
  };

  scrollToHighlightedId = () => {
    if (!this.state.highlightIdToScrollTo) {
      return;
    }

    const scrollToElement = document.getElementById(
      this.state.highlightIdToScrollTo,
    );
    if (scrollToElement) {
      scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.setState({ highlightIdToScrollTo: false });
    }
  };

  componentWillReceiveProps(newProps) {
    const { location } = newProps;
    if (location) {
      const { search } = location;
      if (search) {
        const parsedSearch = queryString.parse(search);
        const highlightId = parsedSearch.highlight;
        this.setHighlightId(highlightId);
        if (!this.props.users && newProps.users) {
          this.setState({ highlightIdToScrollTo: highlightId });
        }
      } else {
        this.setHighlightId(null);
      }
    } else {
      this.setHighlightId(null);
    }
  }

  componentDidUpdate() {
    this.scrollToHighlightedId();
  }

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      cookiesAllowed,
      onCookiesAccepted,
      className,
      users,
      loadUsers,
      loadingUsers,
      loadUserSuccess,
      loadUserError,
      deleteUser,
      deletingUser,
      requestMagicLinkForUser,
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__split-view-container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let filteredUsers = users;
    if (filteredUsers && filteredUsers.filter) {
      if (this.state.filterDeleted) {
        filteredUsers = filteredUsers.filter(x => !x.deleted);
      }
      if (
        this.state.filterAdminStatus &&
        this.state.filterAdminStatus !== 'all'
      ) {
        filteredUsers = filteredUsers.filter(x => {
          if (x.admin && this.state.filterAdminStatus === 'admin') {
            return true;
          }
          if (!x.admin && this.state.filterAdminStatus === 'nonAdmin') {
            return true;
          }
          return false;
        });
      }
      if (
        this.state.filterEmailVerified &&
        this.state.filterEmailVerified !== 'all'
      ) {
        filteredUsers = filteredUsers.filter(x => {
          if (
            x.emailVerified &&
            this.state.filterEmailVerified === 'verified'
          ) {
            return true;
          }
          if (
            !x.emailVerified &&
            this.state.filterEmailVerified === 'notVerified'
          ) {
            return true;
          }
          return false;
        });
      }
      if (this.state.filterName) {
        filteredUsers = filteredUsers.filter(x =>
          x.name.includes(this.state.filterName),
        );
      }
    }

    const showUsers =
      !!filteredUsers && !!filteredUsers.length && !!filteredUsers.map;

    const newUserForm = <Section name="Coming soon" />;

    const listView = (
      <div>
        <Link to="/admin/users?highlight=new">
          <Card className={getClassName('pages__component')}>
            <SubSection name="New +" anchor={false} noPadding />
          </Card>
        </Link>
        {showUsers &&
          filteredUsers.map(n => (
            <Link to={`/admin/users?highlight=${n.id}`}>
              <AdminUsersAPIEntity
                compact
                entity={n}
                highlighted={this.state.highlightId === n.id}
                className={getClassName('pages__component')}
              />
            </Link>
          ))}
      </div>
    );

    let detailView = null;
    if (this.state.highlightId === 'new') {
      detailView = newUserForm;
    } else {
      const detailUsers =
        users && users.filter && this.state.highlightId
          ? users.filter(g => g.id === this.state.highlightId)
          : null;
      const detailUser =
        detailUsers && detailUsers.length > 0 ? detailUsers[0] : null;

      detailView = !detailUser ? null : (
        <AdminUsersAPIEntity
          entity={detailUser}
          highlighted={this.state.highlightId === detailUser.id}
          className={getClassName('pages__component')}
          onUserUpdateSuccess={() => {
            loadUsers();
          }}
        >
          <br />
          <br />
          <Button
            large
            disabled={deletingUser}
            href={`/admin/users/${detailUser.id}`}
          >
            Edit user on dedicated page
          </Button>
          <br />
          <br />
          <Button
            large
            destructive
            onClick={() => requestMagicLinkForUser(detailUser)}
          >
            Login as user
          </Button>
          <br />
          <br />
          <Button
            large
            destructive
            disabled={deletingUser}
            onClick={() => deleteUser(detailUser)}
          >
            Delete
          </Button>
        </AdminUsersAPIEntity>
      );
    }

    const showFilters = users && this.state.showFilters;
    const page = (
      <div className={outerClassNameFinal.join(' ')}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => setLoginRedirect('admin/users')}
        >
          <PageTitle
            link={{ to: '/admin', text: 'Admin' }}
            name="Admin - users"
            className={getClassName('pages__split-view-container-header')}
          >
            <Button
              style={{ marginRight: '1rem', marginBottom: '1rem' }}
              disabled={loadingUsers}
              onClick={() => loadUsers()}
              large
            >
              Reload users
            </Button>
            <Button
              style={{ marginBottom: '1rem' }}
              onClick={() =>
                this.setState({ showFilters: !this.state.showFilters })
              }
              large
            >
              {this.state.showFilters ? 'Hide filters' : 'Show filters'}
            </Button>
            <br />
            <br />
            {showFilters && (
              <>
                <Checkbox
                  label="Show deleted"
                  name="filterDeleted"
                  checked={!this.state.filterDeleted}
                  onChange={event => {
                    this.setState({
                      filterDeleted: !event.target.checked,
                    });
                  }}
                />
                <br />
                <br />
                <label htmlFor="filterAdminStatus">
                  Filter by admin status
                </label>
                <Select
                  id="filterAdminStatus"
                  name="Filter by admin status"
                  value={this.state.filterAdminStatus}
                  options={[
                    { value: 'all', name: 'All' },
                    { value: 'admin', name: 'Admin' },
                    { value: 'nonAdmin', name: 'Non-admin' },
                  ]}
                  onChange={event => {
                    this.setState({ filterAdminStatus: event.target.value });
                  }}
                />
                <br />
                <br />
                <label htmlFor="filterEmailVerified">
                  Filter by email verification status
                </label>
                <Select
                  id="filterEmailVerified"
                  name="Filter by email verification status"
                  value={this.state.filterEmailVerified}
                  options={[
                    { value: 'all', name: 'All' },
                    { value: 'verified', name: 'Verified' },
                    { value: 'nonVerified', name: 'Non-verified' },
                  ]}
                  onChange={event => {
                    this.setState({ filterEmailVerified: event.target.value });
                  }}
                />
                <br />
                <br />
                <label htmlFor="filterName">Filter by name</label>
                <Input
                  id="filterName"
                  value={this.state.filterName}
                  onChange={event =>
                    this.setState({ filterName: event.target.value })}
                />
              </>
            )}
            {users && (
              <>
                <br />
                <Paragraph>
                  Showing {filteredUsers.length} of {users.length} users
                </Paragraph>
                <br />
                <br />
              </>
            )}
          </PageTitle>
          <SplitDetailView
            className={getClassName('pages__split-view-split-view')}
            listView={listView}
            detailView={detailView}
            closeLink="/admin/users"
          />
        </AdminOnly>
      </div>
    );

    return (
      <>
        <Helmet title="Admin - users" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!users && loadingUsers)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin users"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadUsers,
            users,
            loadingUsers,
            loadUserSuccess,
            loadUserError,
          }}
        />
      </>
    );
  }
}

AdminUsers.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  loadUserError: PropTypes.object,
  loadUserSuccess: PropTypes.bool,
  loadingUsers: PropTypes.bool,
  className: PropTypes.string,
  deletingUser: PropTypes.bool,
  loggingIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

AdminUsers.defaultProps = {
  users: null,
  loadUserError: null,
  loadUserSuccess: false,
  loadingUsers: false,
  className: null,
  deletingUser: false,
  loggingIn: false,
  user: null,
  userLoading: false,
};

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import AdminUsersAPIEntity from './AdminUsersAPIEntity';
import Skeleton from './Skeleton';
import generateCsv from './generateCsv';
import HelperFunctions from 'helpers/HelperFunctions';

import { LoadingIndicator } from 'gg-components/dist/LoadingIndicator';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/dist/Cards';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { CodeInline } from 'gg-components/dist/Code';
import Ticket from 'components/Ticket';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/dist/Auth';
import { LoginForm } from 'components/Forms';
import { CookiesOnly } from 'components/Sessions';
import { downloadStringAsCsv } from 'helpers/clientOperations';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const downloadData = data => {
  const csv = generateCsv(data);
  downloadStringAsCsv('user_data.csv', csv);
};

export default class AdminUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.loadUsers();
  };

  expandAll = () => {
    const allElements = document.getElementsByTagName('DIV');
    for (let i = 0; i < allElements.length; i += 1) {
      const element = allElements[i];
      if (HelperFunctions.includes(element.textContent, '▶️ ')) {
        element.click();
      }
    }
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      cookiesAllowed,
      onCookiesAccepted,
      className,
      loadUsers,
      users,
      loading,
      loadUserSuccess,
      loadUserError,
      requestMagicLinkForUser,
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
          setLoginRedirect={() => setLoginRedirect('admin/users')}
        >
          <Section name="Admin - users">
            <span>Users: </span>
            {users && users.length && <span>{users.length}</span>}
            <br />
            <br />
            {users && users.length && (
              <Fragment>
                <Button onClick={() => downloadData(users)} large>
                  Download user data
                </Button>
                <br />
                <br />
                <Button onClick={this.expandAll} large>
                  Expand all entities
                </Button>
              </Fragment>
            )}
            <br />
            <br />
            {users &&
              users.map &&
              users.map(u => (
                <AdminUsersAPIEntity name="more" entityType="User" entity={u}>
                  <br />
                  <br />
                  <Button
                    destructive
                    large
                    onClick={() => requestMagicLinkForUser(u)}
                  >
                    Login as user
                  </Button>
                </AdminUsersAPIEntity>
              ))}
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - users" />
        <CookiesOnly
          cookiesAccepted={cookiesAllowed}
          onAccept={onCookiesAccepted}
        />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={!cookiesAllowed || userLoading || loading}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="Admin users"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            cookiesAllowed,
            onCookiesAccepted,
            className,
            loadUsers,
            users,
            loading,
            loadUserSuccess,
            loadUserError,
            requestMagicLinkForUser,
          }}
        />
      </Fragment>
    );
  }
}

AdminUsers.propTypes = {
  loggingIn: PropTypes.bool,
  loadUserError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

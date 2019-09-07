import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { cssModules } from 'bpk-react-utils';

import AdminUsersAPIEntity from './AdminUsersAPIEntity';
import Skeleton from './Skeleton';
import generateCsv from './generateCsv';

import LoadingIndicator from 'components/LoadingIndicator';
import ArticleCard, { CARD_LAYOUTS } from 'components/Cards';
import GGButton from 'gg-components/dist/GGButton';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import CodeInline from 'gg-components/dist/Code';
import Ticket from 'components/Ticket';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
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

    this.state = { showTickets: false };
  }

  componentDidMount = () => {
    this.props.loadUsers();
  };

  expandAll = () => {
    const allElements = document.getElementsByTagName('DIV');
    for (let i = 0; i < allElements.length; i += 1) {
      const element = allElements[i];
      if (element.textContent.includes('▶️ ')) {
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
      success,
      error,
      requestMagicLinkForUser,
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
          setLoginRedirect={() => setLoginRedirect('admin/users')}
        >
          <Section name="Admin - users">
            <span>Users: </span>
            {users && users.length && <span>{users.length}</span>}
            <br />
            <br />
            <GGButton
              onClick={() =>
                this.setState({ showTickets: !this.state.showTickets })
              }
              large
            >
              {`${this.state.showTickets ? 'Hide' : 'Show'} tickets`}
            </GGButton>
            <br />
            <br />
            {users && users.length && (
              <Fragment>
                <GGButton onClick={() => downloadData(users)} large>
                  Download user data
                </GGButton>
                <br />
                <br />
                <GGButton onClick={this.expandAll} large>
                  Expand all entities
                </GGButton>
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
                  {u && u.registrationStatus && u.registrationStatus.ticket && (
                    <Fragment>
                      {this.state.showTickets && (
                        <Ticket
                          email={u.email}
                          ticket={u.registrationStatus.ticket}
                        />
                      )}
                      {!this.state.showTickets && <span>Ticket hidden</span>}
                      <br />
                      <br />
                    </Fragment>
                  )}
                  <GGButton
                    destructive
                    large
                    onClick={() => requestMagicLinkForUser(u)}
                  >
                    Login as user
                  </GGButton>
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
            success,
            error,
            requestMagicLinkForUser,
          }}
        />
      </Fragment>
    );
  }
}

AdminUsers.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

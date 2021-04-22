import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import { DebugObject } from 'components/common/DebugObject';
import { LoadingCover } from 'gg-components/LoadingCover';
import { Button } from 'gg-components/Button';
import { Paragraph } from 'gg-components/Paragraph';
import { AdminOnly } from 'components/common/Walls';
import { SplitDetailView } from 'components/common/SplitDetailView';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import ErrorDisplay from 'components/common/ErrorDisplay';

import AdminEmailAPIEntity from './AdminEmailAPIEntity';

import { cssModules } from 'gg-components/helpers/cssModules';
import STYLES from './admin-emails.scss';
import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';

const getClassName = cssModules(STYLES);

const AdminEmails = props => {
  const [firstPageHit, setFirstPageHit] = useState(true);
  const [highlightId, setHighlightId] = useState(null);
  const [highlightToScrollTo, setHighlightToScrollTo] = useState(null);

  const {
    load,
    resend,

    adminEmailsState,
    authenticatorState,

    router,
  } = props;

  const { loadError, emails } = adminEmailsState;
  const { user } = authenticatorState;

  useTabMadeVisible(load);

  useEffect(() => {
    load();
  }, []);

  const scrollToHighlightedId = () => {
    if (!highlightToScrollTo) {
      return;
    }

    const scrollToElement = document.getElementById(highlightToScrollTo);
    if (scrollToElement) {
      scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightToScrollTo(null);
    }
  };

  useEffect(() => {
    if (!router || !router.query || !router.query.highlight) {
      setHighlightId(null);
      setFirstPageHit(false);
      return;
    }

    const highlight = router.query.highlight;
    setHighlightId(highlight);
    if (firstPageHit) {
      setHighlightToScrollTo(highlight);
      setFirstPageHit(false);
    }
  }, [router]);

  useEffect(() => {
    scrollToHighlightedId();
  });

  const showEmails = !!emails && !!emails.length && !!emails.map;

  const listView = (
    <div>
      {showEmails &&
        emails.map(n => (
          <AdminEmailAPIEntity
            key={n.id}
            scroll={false}
            href={`/admin/emails?highlight=${n.id}`}
            compact
            entity={n}
            highlighted={highlightId === n.id}
            className={getClassName('admin-emails__card')}
          />
        ))}
    </div>
  );
  let detailView = null;
  const detailEmails = emails && emails.filter && highlightId ? emails.filter(g => g.id === highlightId) : null;
  const detailEmail = detailEmails && detailEmails.length > 0 ? detailEmails[0] : null;

  detailView = !detailEmail ? null : (
    <AdminEmailAPIEntity key={detailEmail.id} entity={detailEmail} highlighted={highlightId === detailEmail.id}>
      <Button
        destructive
        loading={adminEmailsState.resending}
        onClick={() => resend({ emailToResend: detailEmail })}
        className={getClassName('admin-emails__control')}>
        Resend
      </Button>
    </AdminEmailAPIEntity>
  );

  const mainControls = (
    <div>
      <Button
        style={{ marginRight: '1rem', marginBottom: '1rem' }}
        loading={adminEmailsState.loading}
        onClick={() => load()}>
        Reload emails
      </Button>
    </div>
  );

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={authenticatorState.loadAuthError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/emails');
          }}>
          <div>
            <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin emails"></PageTitle>
          </div>
          {mainControls}
          <ErrorDisplay message="Could not load emails" error={loadError} />
          {emails && (
            <Paragraph className={getClassName('admin-analytics__count')}>
              Showing {emails.length} of {emails.length} emails
            </Paragraph>
          )}
          <SplitDetailView
            className={getClassName('admin-emails__split-view')}
            listView={listView}
            detailView={detailView}
            closeLink="/admin/emails"
          />
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminEmails"
        debugObject={{
          load,
          resend,
          adminEmailsState,
          authenticatorState,
        }}
      />
    </>
  );
};

AdminEmails.propTypes = {
  load: PropTypes.func.isRequired,
  resend: PropTypes.func.isRequired,
  adminEmailsState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    emails: PropTypes.arrayOf(PropTypes.object),
    resending: PropTypes.bool,
    resendError: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
    loadAuthError: PropTypes.object,
  }).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      highlight: PropTypes.string,
    }).isRequired,
  }),
};

AdminEmails.defaultProps = {
  adminEmailsState: null,
  verificationState: null,
  router: null,
};

export default withRouter(AdminEmails);

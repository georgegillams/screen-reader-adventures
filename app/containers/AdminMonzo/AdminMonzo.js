import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BpkInput, { INPUT_TYPES } from 'bpk-component-input';
import { Helmet } from 'react-helmet';
import LoadingIndicator from 'components/LoadingIndicator';
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
import { LoginForm } from 'components/Forms';
import Skeleton from './Skeleton';
import { CookiesOnly } from 'components/Sessions';

import STYLES from 'containers/pages.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class AdminMonzo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      keyValue,
      setKey,
      success,
      setting,
      error,
      className,
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
          setLoginRedirect={() => setLoginRedirect('admin/monzo')}
        >
          <Section name="Admin - Monzo">
            <label htmlFor="key" className={getClassName('forms__label')}>
              Key
            </label>
            <BpkInput
              disabled={false && setting}
              type={INPUT_TYPES.password}
              className={getClassName('forms__component')}
              id="key"
              name="key"
              value={keyValue}
              onChange={event => {
                setKey(event.target.value);
              }}
              placeholder="key"
            />
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - Monzo" />
        <LoadingCover loadingSkeleton={Skeleton} loading={userLoading}>
          {page}
        </LoadingCover>
      </Fragment>
    );
  }
}

AdminMonzo.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

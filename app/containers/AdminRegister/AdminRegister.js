import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
import Skeleton from './Skeleton';
import { CookiesOnly } from 'components/Sessions';

import STYLES from 'containers/pages.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED



export default class AdminRegister extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.loadRegister();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      loadRegister,
      register,
      registerLoading,
      loadRegisterSuccess,
      loadRegisterError,
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
          setLoginRedirect={() => setLoginRedirect('admin/register')}
        >
          <Section name="Admin - register (Day 2)">
            <span>Delegates at conference: </span>
            {register && register.day2 && <span>{register.day2.length}</span>}
            <br />
            <br />
            {register &&
              register.day2 &&
              register.day2.length &&
              register.day2.map(n => <p>{n}</p>)}
          </Section>
          <Section name="Admin - register (Day 1)">
            <span>Delegates at conference: </span>
            {register && register.day1 && <span>{register.day1.length}</span>}
            <br />
            <br />
            {register &&
              register.day1 &&
              register.day1.length &&
              register.day1.map(n => <p>{n}</p>)}
          </Section>
        </AdminOnly>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Admin - register" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || registerLoading}
        >
          {page}
        </LoadingCover>
        <DebugObject debugTitle="Admin register" debugObject={{}} />
      </Fragment>
    );
  }
}

AdminRegister.propTypes = {
  loggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  createdPayment: PropTypes.object,
  login: PropTypes.func.isRequired,
  className: PropTypes.string,
};

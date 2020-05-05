import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import Modal from 'react-responsive-modal';
import { cssModules } from 'bpk-react-utils';

import STYLES from './cookie-banner.scss';

import {
  COOKIE_NAMES,
  APP_VERSION,
  COMPONENT_RELOAD_INTERVAL,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
} from 'helpers/constants';
import {Button} from 'gg-components/Button';
import { Section, TextLink } from 'gg-components/Typography';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class CookiesOnly extends Component {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    cookiesAccepted: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      cookiesAccepted: false,
    };
  }

  rejectCookies = () => {
    window.location = '/';
  };

  render() {
    const {
      className,
      children,
      cookiesAccepted,
      onAccept,
      ...rest
    } = this.props; // eslint-disable-line no-shadow

    return (
      <div {...rest}>
        {children}
        {!cookiesAccepted && (
          <Modal
            open
            onClose={() => null}
            center
            closeOnEsc={false}
            closeOnOverlayClick={false}
            showCloseIcon={false}
          >
            <div className={getClassName('cookie-banner__inner-container')}>
              <Section
                name="Privacy and cookies"
                noPadding
                className={getClassName('cookie-banner__blurrb')}
              >
                We use cookies to make your experience on this website as easy
                as possible.
              </Section>
              <br />
              <div>
                <Button
                  className={getClassName('cookie-banner__component')}
                  onClick={onAccept}
                >
                  ACCEPT
                </Button>
                <Button
                  className={getClassName('cookie-banner__component')}
                  small
                  destructive
                  onClick={this.rejectCookies}
                >
                  Nope nope nope
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

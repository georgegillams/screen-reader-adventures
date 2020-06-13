import React from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Button } from 'gg-components/Button';
import { Section } from 'gg-components/Typography';

import STYLES from './cookie-banner.scss';

const getClassName = cssModules(STYLES);

const CookiesOnly = props => {
  const rejectCookies = () => {
    window.location = '/';
  };

  const { className, children, cookiesAccepted, onAccept, ...rest } = props;
  const showModal = !cookiesAccepted;

  return (
    <div {...rest}>
      {children}
      {showModal && (
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
              className={getClassName('cookie-banner__blurb')}
            >
              We use cookies to make your experience on this website as easy as
              possible.
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
                destructive
                onClick={rejectCookies}
              >
                Nope nope nope
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

CookiesOnly.propTypes = {
  onAccept: PropTypes.func.isRequired,
  cookiesAccepted: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

CookiesOnly.defaultProps = {
  className: null,
  children: null,
};

export default CookiesOnly;

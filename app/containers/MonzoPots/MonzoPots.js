import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import HelperFunctions from 'helpers/HelperFunctions';
import MoneyPot from 'components/MoneyPot';
import { Section } from 'components/Typography';
import { LoadingCover } from 'components/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class MonzoPots extends React.Component {
  loadPotData = password => {
    this.props.loadMonzo(password);
  };

  render() {
    const {
      loadMonzo,
      password,
      monzoPots,
      loading,
      success,
      error,
      className,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="My monzo pots" />
        <Section>
          <Section name="Monzo pot tracking 💳">
            <br />
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              style={{ maxWidth: '5rem' }}
              altText="Monzo bank"
              width={1}
              height={1}
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Monzo_logo.svg/200px-Monzo_logo.svg.png"
            />
            <BpkInput
              id="password"
              className={getClassName('pages__component')}
              type={INPUT_TYPES.password}
              name="password"
              value={password}
              onChange={event => {
                this.loadPotData(event.target.value);
              }}
              placeholder="Password"
              clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
              clearButtonLabel="Clear"
              onClear={() => this.setState({ password: '' })}
            />
            <br />
            {monzoPots &&
              monzoPots.map &&
              monzoPots.map((pot, index) => (
                <MoneyPot
                  markerPosition={pot.percentageTimeElapsed}
                  className={getClassName('pages__degree-module')}
                  name={pot.name}
                  shortfall={pot.shortfall}
                  balance={pot.balance}
                  goalAmount={pot.goalAmount}
                  percentage={pot.percentageComplete}
                  filled
                />
              ))}
          </Section>
        </Section>
      </div>
    );
  }
}

MonzoPots.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MonzoPots.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};

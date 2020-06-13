import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Input } from 'gg-components/Input';
import { cssModules } from 'gg-components/helpers/cssModules';
import { MoneyPot } from 'gg-components/MoneyPot';
import { Button } from 'gg-components/Button';
import { SubSection, PageTitle } from 'gg-components/Typography';
import { FormBuilder } from 'gg-components/FormBuilder';

import { associate } from 'helpers/objects';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class MonzoPots extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  loadPotData = password => {
    this.props.loadPots(password);
    this.props.loadTransactions(password);
  };

  render() {
    const {
      user,
      loadPots,
      loadTransactions,
      password,
      pots,
      loadingPots,
      loadPotsSuccess,
      loadPotsError,
      transactions,
      loadingTransactions,
      loadTransactionsSuccess,
      loadTransactionsError,
      addKey,
      addKeyLoading,
      addKeySuccess,
      addKeyError,
      className,
    } = this.props;

    const isAdmin = user && user.admin;

    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    let monzoPotDisplayData = pots;
    if (pots && pots.map && transactions && transactions.map) {
      monzoPotDisplayData = associate(
        pots,
        transactions,
        'name',
        'name',
        'transactionalData',
      );
    }

    return (
      <div className={outerClassNameFinal.join(' ')}>
        <Helmet title="My monzo pots" />
        <PageTitle name="Monzo pot tracking 💳">
          {!monzoPotDisplayData && (
            <>
              <label
                htmlFor="password"
                className={getClassName('forms__label')}
              >
                Password
              </label>
              <Input
                id="password"
                className={getClassName('pages__component')}
                type="password"
                name="password"
                value={password || ''}
                onChange={event => {
                  this.loadPotData(event.target.value);
                }}
                placeholder="Password"
              />
            </>
          )}
          {monzoPotDisplayData && monzoPotDisplayData.map && (
            <Button
              onClick={() => {
                this.loadPotData(password);
              }}
            >
              Refresh
            </Button>
          )}
          <br />
          <br />
          {monzoPotDisplayData &&
            monzoPotDisplayData.map &&
            monzoPotDisplayData.map(pot => (
              <>
                <MoneyPot
                  name={pot.name}
                  balance={pot.balance}
                  goalAmount={pot.goalAmount}
                  markerPosition={pot.expected > 0 ? pot.expected : null}
                  shortfall={pot.shortfall}
                  className={getClassName('pages__degree-module')}
                />
                <SubSection noPadding anchor={false}>
                  Last deposit:{' '}
                  {pot.transactionalData && pot.transactionalData.lastDeposit
                    ? `£${pot.transactionalData.lastDeposit.amount / 100} - ${
                        pot.transactionalData.lastDeposit.time
                      }`
                    : 'loading...'}
                </SubSection>
                <SubSection noPadding anchor={false}>
                  Last withdrawal:{' '}
                  {pot.transactionalData && pot.transactionalData.lastWithdrawal
                    ? `£${pot.transactionalData.lastWithdrawal.amount /
                        100} - ${pot.transactionalData.lastWithdrawal.time}`
                    : 'loading...'}
                </SubSection>
                <br />
                <br />
              </>
            ))}
          {isAdmin && (
            <FormBuilder
              disabled={addKeyLoading}
              entity={this.state.keyData || {}}
              submitLabel="Set key"
              formFields={[
                { id: 'key', name: 'Key', show: true, type: 'password' },
              ]}
              onDataChanged={keyData => {
                this.setState({ keyData });
              }}
              onSubmit={() => {
                addKey(this.state.keyData.key);
              }}
            />
          )}
        </PageTitle>
      </div>
    );
  }
}

MonzoPots.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  loadPotsError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MonzoPots.defaultProps = {
  user: null,
  loading: false,
  loadPotsError: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};

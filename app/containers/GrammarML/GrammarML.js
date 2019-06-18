import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Card from 'bpk-component-card';
import { cssModules } from 'bpk-react-utils';

import Skeleton from './Skeleton';

import GGButton from 'components/GGButton';
import { Section, SubSection } from 'components/Typography';
import FormBuilder from 'components/Forms';
import { ANYTHING_REGEX } from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'components/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES);

export default class GrammarML extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      testData: {},
      testParameters: { ratio: '0.9' },
      newData: {},
    };
  }

  componentDidMount = () => {
    this.props.loadData();
  };

  render() {
    const {
      setLoginRedirect,
      user,
      userLoading,
      className,
      loadData,

      test,
      testPerformance,
      createData,
      deleteData,
      deleteAll,

      data,
      result,
      performance,

      loading,
      success,
      error,

      creating,
      createSuccess,
      createError,

      deleting,
      deleteSuccess,
      deleteError,

      deletingAll,
      deleteAllSuccess,
      deleteAllError,

      testing,
      testSuccess,
      testError,

      testingPerformance,
      testPerformanceSuccess,
      testPerformanceError,
      ...rest
    } = this.props;
    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const page = (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Section name="Machine learning - grammar">
          <SubSection name="Current limitations">
            Can only detect errors based on usage of &quot;there&quot; or
            &quot;their&quot;.
            <br />
            Can only handle sentences that end in &quot;!&quot;, &quot;?&quot;
            or &quot;.&quot;.
            <br />
            Can only handle sentences that contain a single instance of
            &quot;there&quot; or &quot;their&quot;.
          </SubSection>
          <SubSection name="Some test data">
            {`Put your coat down over there. There is something to be said for telling the truth. What is over there? That is neither here nor there. There is always another opportunity to be had down the road. The book is right over there. The remote is over there on the couch. Why don't you go over there and tell me what is inside? There are two people in the room right now. There is supposed to be rain tomorrow. I know there is truth to what you are saying. There are so many stores in this little village. I did not know there was milk in the refrigerator. Who knew there was going to be a sequel to the movie? I hope there is no snow tomorrow. I always wondered what was in there. The red one is their house. The beagle is their dog. Going to the store was their idea. They're in over their heads. Joe and Sue always want things their way. I didn't know that it was their cat. Their dog is always barking. Why don't you ask them what their plans are? I never forgot that it was their suggestion that started the company. Is that their boat? You should stay out of their business. You should stop by their lemonade stand for a drink. Do not take their word at face value. Did you know their house is for sale? Their car goes way faster than your car does. Did you know their new business has taken off?`}
          </SubSection>
          <SubSection name="Performance analysis">
            <FormBuilder
              entity={this.state.testParameters}
              submitLabel="Test"
              formFields={[
                {
                  id: 'ratio',
                  name: 'Ratio',
                  validationRegex: ANYTHING_REGEX,
                  show: true,
                },
              ]}
              disabled={testingPerformance}
              onDataChanged={testParameters => {
                this.setState({ testParameters });
              }}
              onSubmit={() => {
                testPerformance(this.state.testParameters);
              }}
            />
            {performance && testPerformanceSuccess && performance.result && (
              <span>Predictor working at {performance.result * 100}&#37;</span>
            )}
            {testError && <span>{testError.error}</span>}
          </SubSection>
          <SubSection name="Live test">
            <FormBuilder
              entity={this.state.testData}
              submitLabel="Test"
              formFields={[
                {
                  id: 'text',
                  name: 'Test data',
                  validationRegex: ANYTHING_REGEX,
                  show: true,
                },
              ]}
              disabled={testing}
              submitOnChange
              onDataChanged={testData => {
                this.setState({ testData });
              }}
              onSubmit={testData => {
                test(testData);
              }}
            />
            {result && testSuccess && result.result && (
              <span>{result.result}</span>
            )}
            {testError && <span>{testError.error}</span>}
          </SubSection>
          <SubSection name="Training data">
            <FormBuilder
              entity={this.state.newData}
              submitLabel="Add training data"
              formFields={[
                {
                  id: 'text',
                  name: 'Training data',
                  validationRegex: ANYTHING_REGEX,
                  show: true,
                  long: true,
                },
              ]}
              disabled={creating}
              onDataChanged={newData => {
                this.setState({ newData });
              }}
              onSubmit={() => {
                createData(this.state.newData);
              }}
            />
            <GGButton
              large
              destructive
              disabled={deleting}
              style={{ marginBottom: '1rem' }}
              onClick={() => deleteAll()}
            >
              Reset training
            </GGButton>
            {data &&
              data.map &&
              data.map(b => (
                <Card
                  className={getClassName(
                    'pages__component',
                    'pages__bpk-card',
                  )}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    <Section noPadding noAnchor>
                      {b.text}
                    </Section>
                  </span>
                  <GGButton
                    large
                    destructive
                    disabled={deleting}
                    onClick={() => deleteData(b)}
                  >
                    Delete
                  </GGButton>
                </Card>
              ))}
          </SubSection>
        </Section>
      </div>
    );

    return (
      <Fragment>
        <Helmet title="Machine Learning - Grammar" />
        <LoadingCover
          loadingSkeleton={Skeleton}
          loading={userLoading || (!data && loading)}
        >
          {page}
        </LoadingCover>
        <DebugObject
          debugTitle="ML Grammar"
          debugObject={{
            setLoginRedirect,
            user,
            userLoading,
            className,
            loadData,
            data,
            loading,
            success,
            error,
          }}
        />
      </Fragment>
    );
  }
}

GrammarML.propTypes = {
  createData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  setLoginRedirect: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  creatingData: PropTypes.bool,
  deleting: PropTypes.bool,
  loggingIn: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  userLoading: PropTypes.bool,
};

GrammarML.defaultProps = {
  data: null,
  error: null,
  success: false,
  loading: false,
  className: null,
  creatingData: false,
  deleting: false,
  loggingIn: false,
  user: null,
  userLoading: false,
};

import React from 'react';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { Section, SubSection, TextLink } from 'components/Typography';
import DegreeModule from 'components/Degree';

import STYLES from '../pages.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED
import Comments from 'containers/Comments';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const FINAL_DEGREE_PERCENTAGE = 68;



const PAGE_ID = 'work-degree';

class Degree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastFilled: -1,
      filled: [],
    };
  }

  componentDidMount = () => {
    const updateNextValue = () => {
      const valueToSet = this.state.lastFilled + 1;
      const filledCopy = JSON.parse(JSON.stringify(this.state.filled));
      filledCopy[valueToSet] = true;
      this.setState({ lastFilled: valueToSet, filled: filledCopy });
    };

    setTimeout(() => {
      setInterval(updateNextValue, 100);
    }, 1000);
  };

  render() {
    const { className, ...rest } = this.props;

    const outerClassNameFinal = [getClassName('pages__container')];

    if (className) {
      outerClassNameFinal.push(className);
    }

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="My degree" />
        <Section name="MEng Software Engineering 👨‍🎓">
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            style={{ maxWidth: '20rem' }}
            altText="My degree"
            width={1}
            height={1}
            src="https://i.imgur.com/ecbmWmu.jpg"
          />
          <br />
          <FadingLazyLoadedImage
            className={getClassName('pages__image')}
            style={{ maxWidth: '20rem' }}
            altText="My degree"
            width={2000}
            height={442}
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/University_of_Southampton_Logo.svg"
          />
          <br />
          <Section name="Summary">
            4 year integrated Masters of Engineering (2013 - 2015, 2016 - 2018)
            <br />
            <br />
            <DegreeModule
              name="Final percentage"
              percentage={FINAL_DEGREE_PERCENTAGE}
              filled={this.state.filled[0]}
            />
            <br />
            Degree classification:{' '}
            <span style={{ fontWeight: 'bold' }}>1st class honours</span>
            <br />
            <br />
            <TextLink
              href="https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs"
              external
            >
              Degree information (current){' '}
            </TextLink>
            <br />
            <TextLink
              href="https://web.archive.org/web/20131128090133/https://www.ecs.soton.ac.uk/programmes/g600-meng-software-engineering-4-yrs#modules"
              external
            >
              Degree information (archived){' '}
            </TextLink>
          </Section>
          <Section name="Breakdown">
            <SubSection name="Year 1">
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Algorithmics"
                percentage={66}
                filled={this.state.filled[1]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Programming I"
                percentage={69}
                filled={this.state.filled[2]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Computer Systems"
                percentage={66}
                filled={this.state.filled[3]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Data Management"
                percentage={67}
                filled={this.state.filled[4]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Professional Development"
                percentage={65}
                filled={this.state.filled[5]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Programming II"
                percentage={68}
                filled={this.state.filled[6]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Foundations of Computer Science"
                percentage={71}
                filled={this.state.filled[7]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Software Modelling"
                percentage={60}
                filled={this.state.filled[8]}
              />
            </SubSection>
            <SubSection name="Year 2">
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Distributed Systems"
                percentage={76}
                filled={this.state.filled[9]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Intelligent Agents"
                percentage={79}
                filled={this.state.filled[10]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Programming III"
                percentage={59}
                filled={this.state.filled[11]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Theory of Computing"
                percentage={63}
                filled={this.state.filled[12]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Group Project"
                percentage={65}
                filled={this.state.filled[13]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Programming Language Concepts"
                percentage={68}
                filled={this.state.filled[14]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Interaction Design"
                percentage={61}
                filled={this.state.filled[15]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Advanced Software Modelling"
                percentage={60}
                filled={this.state.filled[16]}
              />
            </SubSection>
            <SubSection name="Year 3">
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Dissertation Project"
                percentage={73}
                filled={this.state.filled[17]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Cyber Security"
                percentage={61}
                filled={this.state.filled[18]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Machine Learning"
                percentage={67}
                filled={this.state.filled[19]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Advanced Databases"
                percentage={77}
                filled={this.state.filled[20]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Secure Systems"
                percentage={77}
                filled={this.state.filled[21]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Engineering Law"
                percentage={62}
                filled={this.state.filled[22]}
              />
            </SubSection>
            <SubSection name="Year 4">
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Group Design Project"
                percentage={71.75}
                filled={this.state.filled[23]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Web Development"
                percentage={63}
                filled={this.state.filled[24]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Automated Code Generation"
                percentage={71}
                filled={this.state.filled[25]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Semantic Web"
                percentage={70}
                filled={this.state.filled[26]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Web Architecture"
                percentage={52}
                filled={this.state.filled[27]}
              />
              <DegreeModule
                markerPosition={FINAL_DEGREE_PERCENTAGE}
                className={getClassName('pages__degree-module')}
                name="Data Mining"
                percentage={62}
                filled={this.state.filled[28]}
              />
            </SubSection>
          </Section>
        </Section>
        <Comments pageId={PAGE_ID} />
      </div>
    );
  }
}

export default Degree;

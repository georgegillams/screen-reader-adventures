import React from 'react';
import { TextLink, SubSection } from 'components/Typography';
import { cssModules } from 'bpk-react-utils';
import STYLES from './creative-commons.scss';
const getClassName = cssModules(STYLES);

const CreativeCommons = props => {
  const { className, ...rest } = props;

  return (
    <div
      className={getClassName('creative-commons__wrapper', className)}
      {...rest}
    >
      <SubSection
        className={getClassName('creative-commons__inner')}
        noAnchor
        name="Copyright"
      >
        <span>
          Most of my photos are licensed under{' '}
          <TextLink
            external
            href="https://creativecommons.org/licenses/by-sa/3.0/"
          >
            Creative Commons BY-SA 3.0{' '}
          </TextLink>
          .<br />
          If you are unsure about your right to use them please{' '}
          <TextLink to="/contact">contact me</TextLink>.
        </span>
      </SubSection>
    </div>
  );
};

export default CreativeCommons;

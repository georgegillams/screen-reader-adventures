import React from 'react';
import PropTypes from 'prop-types';

import { CodeInline, SubSection } from 'components/Code';

const ColourPalletteItem = props => {
  const { colourName, colour, ...rest } = props;

  return (
    <div style={{ margin: '0 1rem', textAlign: 'center' }} {...rest}>
      <SubSection noAnchor>
        {colourName}
        <br />
        <CodeInline>{colour}</CodeInline>
      </SubSection>
      <div
        style={{
          width: '5rem',
          height: '5rem',
          backgroundColor: colour,
          borderRadius: '5rem',
        }}
      />
    </div>
  );
};

ColourPalletteItem.propTypes = {
  colourName: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
};

export default ColourPalletteItem;

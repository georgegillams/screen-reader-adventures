import React from 'react';
import Funnies from 'funnies';
import ReactLoading from 'react-loading';

import { SubSection } from './';

const funnies = new Funnies();

const Loading = () => (
  <SubSection noAnchor style={{ textAlign: 'center' }} name="Loading...">
    {funnies.message()}
    <br />
    <br />
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <ReactLoading
        style={{ width: '5rem' }}
        type="bubbles"
        color="#1e1e1e"
        height={80}
        width={56.1}
      />
    </div>
  </SubSection>
);

export default Loading;

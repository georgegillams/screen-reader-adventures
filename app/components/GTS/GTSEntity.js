import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getTimeDifference } from 'helpers/time';
import { TextLink, Section } from 'components/Typography';

class GTSEntity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { gts } = this.props;
    const { destination, eta, lastUpdatedTimestamp, emoji } = gts;

    return (
      <Section name="How long til I arrive?">
        {`I'm on my way to: ${destination}`}
        <br />
        <br />
        {`Estimated time of arrival: ${eta}`}
        <br />
        <br />
        <Section name={emoji} />
        <br />
        <br />
        {`Last updated: ${getTimeDifference(lastUpdatedTimestamp)}`}
      </Section>
    );
  }
}

GTSEntity.propTypes = {
  welcomMessage: PropTypes.object.isRequired,
};

export default GTSEntity;

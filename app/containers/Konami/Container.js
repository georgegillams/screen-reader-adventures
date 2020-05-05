import React, { Component, Fragment } from 'react';
import konami from 'konami';
import { DebugObject } from 'gg-components/Auth';

class Konami extends Component {
  constructor() {
    super();

    this.state = { konamiActivated: false };

    var easter_egg = new konami(() => {
      alert('Konami Code!');
      this.setState({ konamiActivated: true });
    });
  }

  render() {
    const { konamiActivated } = this.state;
    return (
      <Fragment>
        {konamiActivated && <h1>{'KONAMI TIME!!'}</h1>}
        <DebugObject debugTitle="Konami" debugObject={{ konamiActivated }} />
      </Fragment>
    );
  }
}

export default Konami;

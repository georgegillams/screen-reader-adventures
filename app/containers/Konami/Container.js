import React, { Component, Fragment } from 'react';
import konami from 'konami';
import { DebugObject } from 'gg-components/Auth';
import ConfettiGenerator from 'confetti-js';

class Konami extends Component {
  constructor() {
    super();

    this.state = { konamiActivated: false };

    var easter_egg = new konami(() => {
      this.setState({ konamiActivated: true });
      this.setupConfetti();
    });
  }

  setupConfetti = () => {
    var confettiSettings = { target: 'confetti-holder' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  };

  render() {
    const { konamiActivated } = this.state;
    return (
      <Fragment>
        {konamiActivated && (
          <canvas
            aria-hidden="true"
            id="confetti-holder"
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              pointerEvents: 'none',
            }}
          />
        )}
        <DebugObject debugTitle="Konami" debugObject={{ konamiActivated }} />
      </Fragment>
    );
  }
}

export default Konami;

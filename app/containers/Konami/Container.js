import React, { Component } from 'react';
import KonamiResponder from 'konami';
import { DebugObject } from 'gg-components/Auth';
import ConfettiGenerator from 'confetti-js';

class Konami extends Component {
  constructor() {
    super();

    this.state = { konamiActivated: false };

    this.easterEgg = new KonamiResponder(() => {
      this.setState({ konamiActivated: true });
      this.setupConfetti();
    });
  }

  setupConfetti = () => {
    const confettiSettings = { target: 'confetti-holder' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  };

  render() {
    const { konamiActivated } = this.state;
    return (
      <>
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
      </>
    );
  }
}

export default Konami;

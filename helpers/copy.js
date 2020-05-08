const getCopyWithOptions = options => {
  let { VOKey } = options;
  VOKey = VOKey || 'ctrl+opt';

  return {
    setup1: {
      macOS: `To start, open Safari. VoiceOver works best when you use Apple&apos;s own browser.`,
    },
    setup2: {
      macOS: `To enable VoiceOver, hold cmd and press F5. (if you have a TouchBar device, you can press the power button 3 times to bring up accessibility options.)`,
    },
    setup3: {
      macOS: `To enable VoiceOver, hold cmd and press F5. (if you have a TouchBar device, you can press the power button 3 times to bring up accessibility options.)`,
    },
    level1Description: {
      macOS: `Remember that you'll get the best experience in Safari. Use ${VOKey} and the left/right arrow keys to navigate to the goal space below. Once you reach the goal at the end, you'll be able to progress to the next stage. Press ${VOKey}+right to select the button and then press ${VOKey}+space to continue.`,
    },
    level2Description: {
      macOS: `Navigating up and down a page is done the same way as navigating across. Still using the left and right arrows, you can navigate across the screen, and then down the screen.`,
    },
    level3Description: {
      macOS: `In this level we want to get to the goal but cannot go through the lava. To jump to the next heading in a page, you can use ${VOKey}+cmd+H. This allows you to jump straight to the heading after the lava without selecting every element. Once you're safely past the lava, continue to the goal.`,
    },
    level4Description: {
      macOS: `Using the same principle as before you can jump over the lava and retrieve the key waiting on the other side. Once you have the key, jump back to a previous heading using ${VOKey}+cmd+shift+H. Do this until you're safely back across the lava.`,
    },
  };
};

export default getCopyWithOptions;

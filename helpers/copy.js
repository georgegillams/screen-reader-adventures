const getCopyWithOptions = options => {
  let { VOKey } = options;
  VOKey = VOKey || 'ctrl+option';
  return {
    configure1: {
      macOS: `VoiceOver works slightly differently depending whether you have a TouchBar or not. So that we can tailor the instructions, please select one of the following options.`,
    },
    configure2: {
      macOS: `VoiceOver can be configured to use either Control+Option or Caps lock as the activation key(s). The default is Control+Option. Choose which setting you have enabled below. You can always come back to this page if you change it in the future.`,
    },
    setup1: {
      macOS: `To start, open Safari. VoiceOver works best when you use Apple's own browser.`,
    },
    setup2: {
      macOS: {
        touchBar: `To enable VoiceOver, press the power button 3 times to bring up accessibility options and tick "Enable VoiceOver".`,
        noTouchBar: `To enable VoiceOver, hold cmd and press F5. (You may need to hold fn to enable your F-keys.)`,
      },
    },
    setup3: {
      macOS: `You'll see that the webpage has been highlighted with a black and white box, and VoiceOver is telling you about it. If this doesn't happen, click the webpage anywhere to select it.`,
    },
    setup4: {
      macOS: `VoiceOver navigation is 3D, meaning you can move inwards to specific elements (right down to an individual character of a word). To move into the structure of the page, hold shift+${VOKey} and press down. You'll notice that the menu button is now selected.`,
    },
    setup5: {
      macOS: `To move between elements within an area of the page, hold ${VOKey} and tap the left and right keys. If you press ${VOKey}+right 3 times, you'll be on the main web content.`,
    },
    setup6: {
      macOS: `Again, to move into the main content we must use shift+${VOKey}+down. Once we're inside the main content, we can navigate around it using ${VOKey}+left/right.  `,
    },
    setup7: {
      macOS: ` Spend some time on this page getting familiar with how to navigate between elements. Try going down into an element until you are navigating between individaul charaters, then try coming up again.  `,
    },
    setup8: {
      macOS: ` When you move onto a button element, VoiceOver will read out the title, and that the element is a button. If the button is disabled, it will also tell you that it's "dimmed".  `,
    },
    setup9: {
      macOS: ` To "click" an interactive element using VoiceOver, we press cmd+option+space. Give that a go on the button below.  `,
    },
    setup10: {
      macOS: ` The experience is similar for other standard UI elements too.  `,
    },
    setupExampleElementLabel: { macOS: `Example` },
    settingsCTA: { macOS: `Continue…` },
    setupCTA: { macOS: `I'm ready to play…` },
    level1Description: {
      macOS: `To enable the button below and move to the next stage, navigate to the goal space.`,
    },
    level1Hint: {
      macOS: `Keep pressing ${VOKey}+right until you reach the goal.`,
    },
    level2Description: {
      macOS: `Navigating up and down a page is done the same way as navigating across.`,
    },
    level2Hint: {
      macOS: `${VOKey}+right will take you down the page as well as across.`,
    },
    level3Description: {
      macOS: `In this level we want to get to the goal but cannot go through the lava. We'll have to find a way to jump over it.`,
    },
    level3Hint: { macOS: `Press ${VOKey}+cmd+H to jump over the lava.` },
    level4Description: {
      macOS: `Using the same principle as before you can jump over the lava and retrieve the key waiting on the other side. Once you have the key, you can also jump backwards to the previous heading.`,
    },
    level5Description: {
      macOS: `Skipping between headings is a good way to avoid lava that you can't see.`,
    },
    level4Hint1: { macOS: `Press ${VOKey}+cmd+H to jump over the lava.` },
    level4Hint2: { macOS: `Collect the key to unlock the goal.` },
    level4Hint3: {
      macOS: `Press ${VOKey}+cmd+shift+H to jump backwards over the lava.`,
    },
  };
};
export default getCopyWithOptions;

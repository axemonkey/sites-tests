Feature('cubi.st: basic scenarios');

Scenario('page loads and has basic content', async ({ I }) => {
  const bodyClassMatcher = /<body class="([^"]*)"/;
  let pageSource;
  let getBodyClass;
  I.amOnPage('http://cubist.node/');

  I.say('Check H1');
  const siteName = await I.grabTextFrom('h1 .siteName');
  I.assertEqual(siteName.toLowerCase(), 'cubist');
  I.see('A speed cubing stopwatch', 'h1 .strap');

  I.say('Check default options are displayed');
  I.see('Puzzle: 3x3x3', '#options');
  I.see('Inspection: 15s', '#options');
  I.see('Sound: On', '#options');
  I.see('Theme: Dark', '#options');

  I.say('Check default theme');
  pageSource = await I.grabSource();
  getBodyClass = pageSource.match(bodyClassMatcher);
  if (getBodyClass) {
    I.say(`getBodyClass returns "${getBodyClass}"`);
    if (getBodyClass.length > 1) {
      I.assertStringIncludes(getBodyClass[1], 'dark');
    }
  } else {
    I.say('body class not found - skipping check');
  }

  I.say('Check start button');
  I.see('START', '#timer');

  I.say('Check scramble');
  I.seeElement('#scramble ul');
  I.seeNumberOfElements('#scramble ul li', 25);

  I.say('Check help popup');
  I.click('#helpButton');
  I.waitForVisible('#infoModal', 3);
  I.see('INSTRUCTIONS');
  I.click('button.modal__btn', '#infoModal');
  I.waitForInvisible('#infoModal', 3);

  I.say('Check settings popup');
  I.click('#settingsButton');
  I.waitForVisible('#settingsModal', 3);
  I.seeCheckboxIsChecked('#soundCheckbox');
  I.seeCheckboxIsChecked('#themeCheckbox');
  I.seeInField('#selectPuzzle', '3x3x3');
  I.seeInField('#countdownDuration', '15');

  I.click('label[for="themeCheckbox"]');
  I.wait(1);
  pageSource = await I.grabSource();
  getBodyClass = pageSource.match(bodyClassMatcher);
  if (getBodyClass) {
    I.say(`getBodyClass returns "${getBodyClass}"`);
    if (getBodyClass.length > 1) {
      I.assertStringIncludes(getBodyClass[1], 'light');
    }
  } else {
    I.say('body class not found - skipping check');
  }
  I.click('label[for="themeCheckbox"]');
  I.wait(1);
  pageSource = await I.grabSource();
  getBodyClass = pageSource.match(bodyClassMatcher);
  if (getBodyClass) {
    I.say(`getBodyClass returns "${getBodyClass}"`);
    if (getBodyClass.length > 1) {
      I.assertStringIncludes(getBodyClass[1], 'dark');
    }
  } else {
    I.say('body class not found - skipping check');
  }

  I.click('button.modal__btn', '#settingsModal');
  I.waitForInvisible('#settingsModal', 3);

  I.say('Check timer starts');
  I.click('#timer');
  I.wait(2);
  I.dontSee('START', '#timer');

  I.say('Check timer stops');
  I.click('#timer');
  let timerValue1 = await I.grabTextFrom('#timer');
  I.say(`Timer says: ${timerValue1}`);
  I.wait(3);
  let timerValue2 = await I.grabTextFrom('#timer');
  I.say(`Timer now says: ${timerValue2}`);
  I.assertEqual(timerValue1, timerValue2);

  I.say('Check recording times works');
  I.dontSeeElement('#timesContainer');
  I.click('#settingsButton');
  I.waitForVisible('#settingsModal', 3);
  I.selectOption('#countdownDuration', 'None');
  I.click('button.modal__btn', '#settingsModal');
  I.waitForInvisible('#settingsModal', 3);
  I.click('#timer');
  I.wait(2);
  I.click('#timer');
  I.seeElement('#timesContainer');
  I.wait(2);
  I.click('#timer');
  I.wait(2);
  I.click('#timer');
  I.seeNumberOfElements('#timesList li', 2);
  I.wait(2);

  I.say('Check deleting a time');
  I.click('Delete', '#timesList');
  I.wait(1);
  I.seeNumberOfElements('#timesList li', 1);

  I.say('Check delete times modal');
  I.click('#clearTimes');
  I.waitForVisible('#deleteTimesModal', 3);
  I.click('No, keep them');
  I.waitForInvisible('#deleteTimesModal', 3);
  I.seeElement('#timesContainer');
  I.wait(1);
  I.click('#clearTimes');
  I.waitForVisible('#deleteTimesModal', 3);
  I.click('Yes, delete them');
  I.waitForInvisible('#deleteTimesModal', 3);
  I.dontSeeElement('#timesContainer');

  I.say('Change options');
  I.click('#settingsButton');
  I.waitForVisible('#settingsModal', 3);
  I.selectOption('#selectPuzzle', '7x7x7');
  I.selectOption('#countdownDuration', '3 seconds');
  I.click('label[for="soundCheckbox"]');
  I.click('label[for="themeCheckbox"]');
  I.click('button.modal__btn', '#settingsModal');
  I.waitForInvisible('#settingsModal', 3);

  I.see('Puzzle: 7x7x7', '#options');
  I.see('Inspection: 3s', '#options');
  I.see('Sound: Off', '#options');
  I.see('Theme: Light', '#options');
});

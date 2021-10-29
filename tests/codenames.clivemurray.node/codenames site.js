Feature('codenames.clivemurray.com: basic scenarios');

Scenario('page loads and has basic content', async ({ I }) => {
  I.amOnPage('http://codenames.clivemurray.node/');
  I.say('Check intro copy');
  I.see('Welcome to...');
  I.say('Check H1');
  I.seeElement('h1 span.project');
  I.seeElement('h1 span.name');
  I.seeElement('h1 span.name span.prefix');
  I.seeElement('h1 span.name span.animal');

  I.wait(1);
  I.say('Check that spans are not empty');

  let prefix = await I.grabTextFrom('.prefix');
  let animal = await I.grabTextFrom('.animal');

  I.assertNotEqual(prefix, '');
  I.assertNotEqual(animal, '');
});

Feature('clivemurray.com: basic scenarios');

Scenario('page loads and has basic content', async ({ I }) => {
  I.amOnPage('http://clivemurray.node/');
  I.say('Check H1');
  I.see('clivemurray.com', 'h1');
  I.say('Check intro copy');
  I.see('I’m Clive Murray - rock guitarist and gentleman adventurer from a land before time.');
  let h2text = await I.grabTextFrom('h2');
  I.assertNotEqual(h2text, '');
});

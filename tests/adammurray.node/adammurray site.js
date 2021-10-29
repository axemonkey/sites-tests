Feature('adammurray.name: basic scenarios');

Scenario('page loads and has basic content', ({ I }) => {
  I.amOnPage('http://adammurray.node/');
  I.say('Check H1');
  I.seeElement(`//h1[contains(text(), "Adam Murray")]`);
});

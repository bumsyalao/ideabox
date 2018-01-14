module.exports = new (function () {
  const testCase = this;
  testCase['shows the landing page'] = function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.homepage', 1500)
      .expect.element('.homepage').to.be.present;
    client.end();
  };

  testCase['landing page should have button text GET STARTED'] = function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('.center', 1500)
      .waitForElementVisible('#download-button', 1500)
      .expect.element('#download-button').text.to.equal('GET STARTED');
    client.end();
  };

  testCase['Login page should have heading text LOGIN'] = function (client) {
    client
      .url('http://localhost:3000/auth')
      .waitForElementVisible('.user_options-container', 1500)
      .waitForElementVisible('.forms_title', 2500)
      .expect.element('.forms_title').text.to.equal('LOGIN');
    client.end();
  };

  testCase['Login page should successfully login registered user'] = function (client) {
    client
      .url('http://localhost:3000/auth')
      .waitForElementVisible('.user_options-container', 2500)
      .waitForElementVisible('.user_forms-login', 2500)
      .pause(3000)
      .waitForElementVisible('.forms_field-input', 1500)
      .waitForElementVisible('#username', 1500)
      .pause(3000)
      .setValue('#username', 'bunmitest')
      .pause(3000)
      .setValue('#password', 'bunmi')
      .pause(3000)
      .waitForElementVisible('.forms_buttons-action', 1500)
      .pause(2000)
      .click('.forms_buttons-action')
      .pause(5000)
      .waitForElementVisible('.dashboard', 2500)
      .expect.element('.dashboard').to.be.visible;
    client.end();
  };

  testCase['Register page should successfully register user'] = function (client) {
    client
      .url('http://localhost:3000/auth')
      .waitForElementVisible('.user_options-container', 2500)
      .waitForElementVisible('#signup-button', 2500)
      .click('#signup-button')
      .pause(3000)
      .waitForElementVisible('.user_forms-signup', 2500)
      .pause(3000)
      .setValue('#username', 'user')
      .pause(3000)
      .setValue('#email', 'user@email.com')
      .pause(3000)
      .setValue('#password', 'user')
      .pause(3000)
      .waitForElementVisible('#register-btn', 3500)
      .pause(2000)
      .click('#register-btn')
      .pause(5000)
      .waitForElementVisible('.dashboard', 3500)
      .expect.element('.dashboard').to.be.visible;
    client.end();
  };
})();

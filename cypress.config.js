const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    allure: true,
    allureResultsPath: 'allure-results',
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('@shelex/cypress-allure-plugin/writer')(on, config);
      return config;
    },
    browswer: 'chrome',
    specPattern: 'cypress/e2e/**/*.cy.js',
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 20000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 10000,
    experimentalOriginDependencies: true,
  },
});

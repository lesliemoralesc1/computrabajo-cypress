// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@shelex/cypress-allure-plugin';

let lastScreenshotDetails = null;

Cypress.Screenshot.defaults({
  onAfterScreenshot(_, details) {
    lastScreenshotDetails = details;
  },
});

const attachLastScreenshotToAllure = (name) => {
  if (!lastScreenshotDetails || !lastScreenshotDetails.path) {
    return;
  }

  cy.readFile(lastScreenshotDetails.path, 'base64').then((base64) => {
    cy.allure().attachment(name, base64, 'image/png');
  });
};

afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'passed') {
    const safeTitle = this.currentTest.title.replace(/[^a-zA-Z0-9-_]+/g, '_');
    cy.screenshot(`passed/${safeTitle}`, { capture: 'viewport' });
    cy.then(() => {
      attachLastScreenshotToAllure(`Screenshot - ${this.currentTest.title}`);
    });
  }
});
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar específicamente el error 'ga is not defined'
  if (err.message.includes('ga is not defined')) {
    return false; // Evita que Cypress falle el test
  }

  // Permitir que otros errores sí lo fallen
  return true;
});

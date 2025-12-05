// cypress/support/helpers/logger.js

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
};

const logWithLevel = (level, message) => {
  const timestamp = new Date().toLocaleTimeString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  
  cy.log(logMessage);
  console.log(logMessage);
};

export const logDebug = (message) => logWithLevel(LOG_LEVELS.DEBUG, message);
export const logInfo = (message) => logWithLevel(LOG_LEVELS.INFO, message);
export const logWarning = (message) => logWithLevel(LOG_LEVELS.WARNING, message);
export const logError = (message) => logWithLevel(LOG_LEVELS.ERROR, message);

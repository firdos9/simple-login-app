//cypress.config.js

//ensure cypress loads the apps frome running Express server
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      specPattern: 'cypress/e2e/**/*.js',
  // tells Cypress where to find spec files
   
   
      setupNodeEvents(on, config) {
    
    },
  },
});


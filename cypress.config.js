const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.{js,jsx,ts,tsx,feature}",
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000'
  },
  fixturesFolder: "cypress/fixtures",
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots"
});

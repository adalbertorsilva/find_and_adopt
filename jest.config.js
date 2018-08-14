
module.exports = {
  collectCoverage: true,
  coverageReporters: ['html', 'lcov'],
  globalSetup: './jest/jest-suite-setup.js',
  globalTeardown: './jest/jest-suite-teardown.js',
  setupTestFrameworkScriptFile: './jest/jest-setup.js'
}

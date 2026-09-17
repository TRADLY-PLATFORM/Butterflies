// Smoke tests: fail on any client-side crash or console error.
// Run against a live server: `npm run test:smoke` (starts prod server on 4444
// automatically, reuses it if already running).
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: process.env.SMOKE_BASE_URL || 'http://localhost:4444',
    channel: 'chrome',
    headless: true,
    viewport: { width: 1400, height: 900 },
  },
  projects: [{ name: 'smoke' }],
  webServer: {
    command:
      'npx env-cmd -f env/.env.production next start -p 4444',
    port: 4444,
    reuseExistingServer: true,
    timeout: 120000,
    stdout: 'pipe',
  },
});

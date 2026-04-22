// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './test/global-setup.js',
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }], ['line']],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from "../../playwright.config";

setup('do login', async ({ page }) => {
  await page.goto('/mnt/certification/mst/mst_login.php');
  await page.locator('input[name="emp_id"]').fill(process.env.USERNAME);
  await page.locator('input[name="password"]').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'login' }).click();

  await page.context().storageState({ path: STORAGE_STATE });
});


// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('/mnt/certification/mst/mst_login.php');
  await page.locator('input[name="emp_id"]').fill(process.env.USERNAME);
  await page.locator('input[name="password"]').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'login' }).click();
  await page.context().storageState({ path: STORAGE_STATE });
  await browser.close();
}

export default globalSetup;
import { test, expect } from '@playwright/test';

test.skip('Basic Navigation', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
});

test.skip('Interacting with Web Element on Gitlab', async ({page}) => {
    await page.goto('https://gitlab.com/');
    await page.locator('#be-navigation-desktop').getByRole('link', { name: 'Get free trial'}).click();

    // Using locator
    // await page.locator('[data-testid="new-user-first-name-field"]').fill('First name');
    // await page.locator('[data-testid="new-user-last-name-field"]').fill('Last name');

    // Using getByTestId
    await page.getByTestId('new-user-first-name-field').fill('First name');
    await page.getByTestId('new-user-last-name-field').fill('Last name');

    await page.waitForTimeout(10000);
});

test('Using Various Locator Methods', async ({page}) => {
    await page.goto('https://gitlab.com/');
    await page.getByRole('button', { name: 'Main menu'}).click();
    await page.getByRole('link', { name: 'Sign in'}).click();

    // await page.click(':has-text("Sign in")');

    await page.waitForTimeout(10000);
});
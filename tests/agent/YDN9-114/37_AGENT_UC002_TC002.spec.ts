import { test, expect } from '@playwright/test';
const ID = "111034005001";

test.beforeEach(async ({ page }) => {
    await page.goto('/dealer-info/login.php');
    await page.locator('input[name="charge_id"]').fill(process.env.USERID);
    await page.locator('input[name="password"]').fill(process.env.PASSWORD);
    await page.locator('#login_button').click();
});

test('Display Authorize Dealer ID', async({ page })=> {
    //#region STEPS
    await page.goto('/dealer-info/idm_user/menu.php');
    await page.locator('a[href="./search.php"]').click();
    await page.locator(`input[onclick*="refer.php?id=${ID}"]`).click();
    await page.locator(`input[onclick*="detail.php?no=1&id=${ID}"]`).click();
    //#endregion

    //#region ASSERTIONS
    // Dealer ID
    await expect(page.getByRole('cell', { name: '特約店：111034 [ワイピービデオ（株）]' })).toBeVisible();
    await expect(page.locator('#hdr')).toContainText('特約店：111034 [ワイピービデオ（株）]');
    //#endregion
});
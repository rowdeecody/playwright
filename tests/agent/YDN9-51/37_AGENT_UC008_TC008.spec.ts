import { test, expect } from '@playwright/test';

const ID = "111034005001";

test.beforeEach(async ({ page }) => {
    await page.goto('/dealer-info/login.php');
    await page.locator('input[name="charge_id"]').fill(process.env.USERID);
    await page.locator('input[name="password"]').fill(process.env.PASSWORD);
    await page.locator('#login_button').click();
});

test('Displays User Information System Usage Item Deletion Request page', async({ page })=> {
    //#region STEPS
    await page.goto('/dealer-info/idm_user/menu.php');
    await page.locator('a[href="./search.php"]').click();
    await page.locator(`input[onclick*="refer.php?id=${ID}"]`).click();
    await page.locator(`input[onclick*="delete_system_input.php?id=${ID}"]`).click();
    //#endregion

    //#region ASSERTIONS
    // System Usage Items to Delete
    // GWEB
    expect(await page.locator('#gweb').isChecked()).toBe(false);
    await expect(page.locator('#gweb')).toBeDisabled();
    await expect(page.getByRole('cell', { name: 'G-Web', exact: true })).toBeVisible();

    // PRESS
    expect(await page.locator('#press').isChecked()).toBe(false);
    await expect(page.locator('#press')).toBeDisabled();
    await expect(page.getByText('PRESS')).toBeVisible();
    await expect(page.getByText('PRESS')).toHaveCSS('color', 'rgb(128, 128, 128)');

    // GRADE
    expect(await page.locator('input[name="grade"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="grade"]')).toBeDisabled();
    await expect(page.getByRole('cell', { name: '英語教室グレードシステム', exact: true })).toBeVisible();

    // TEACHING
    expect(await page.locator('input[name="teaching"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="teaching"]')).toBeDisabled();
    await expect(page.getByRole('cell', { name: '英語教室グレードシステム', exact: true })).toBeVisible();

    // KEYBOARD
    expect(await page.locator('input[name="keyboard"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="keyboard"]')).toBeEnabled();
    await expect(page.getByRole('cell', { name: '鍵盤レポート', exact: true })).toBeVisible();

    // BILL
    expect(await page.locator('input[name="bill"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="bill"]')).toBeDisabled();
    await expect(page.getByRole('cell', { name: '請求書明細データ', exact: true })).toBeVisible();

    // RAPPORT
    expect(await page.locator('input[name="rapport"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="rapport"]')).toBeDisabled();
    await expect(page.getByRole('cell', { name: 'RAPPORT', exact: true })).toBeVisible();

    // REPANAVI
    expect(await page.locator('input[name="repanavi"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="repanavi"]')).toBeDisabled();
    await expect(page.getByRole('cell', { name: 'れぱナビ', exact: true })).toBeVisible();

    // TUNING
    expect(await page.locator('input[name="tuning"]').isChecked()).toBe(false);
    await expect(page.locator('input[name="tuning"]')).toBeDisabled();
    await expect(page.getByRole('cell', { name: '新調律システム(導入店限定)', exact: true })).toBeVisible();
    //#endregion
});
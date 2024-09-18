import { test, expect } from '@playwright/test';

const ID = "111034005001";

test.beforeEach(async ({ page }) => {
    await page.goto('/dealer-info/login.php');
    await page.locator('input[name="charge_id"]').fill(process.env.USERID);
    await page.locator('input[name="password"]').fill(process.env.PASSWORD);
    await page.locator('#login_button').click();
});

test('Redirect to User Information System Usage Item Deletion Request Page', async({ page })=> {
    //#region STEPS
    await page.goto('/dealer-info/idm_user/menu.php');
    await page.locator('a[href="./search.php"]').click();
    await page.locator(`input[onclick*="refer.php?id=${ID}"]`).click();
    await page.locator(`input[onclick*="delete_system_input.php?id=${ID}"]`).click();
    await page.getByRole('button', { name: '入力内容を確認する' }).click();
    //#endregion

    //#region ASSERTIONS
    expect(page.url()).toBe(`${process.env.BASEURL}/dealer-info/idm_user/delete_system_input.php?error_flg=1&id=${ID}`);
    await expect(page.getByText('削除するシステム利用項目が選択されていません。')).toBeVisible();
    //#endregion
});
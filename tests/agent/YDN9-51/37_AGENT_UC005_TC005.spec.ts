import { test, expect } from '@playwright/test';

const ID = "111034005001";

test.beforeEach(async ({ page }) => {
    await page.goto('/dealer-info/login.php');
    await page.locator('input[name="charge_id"]').fill(process.env.USERID);
    await page.locator('input[name="password"]').fill(process.env.PASSWORD);
    await page.locator('#login_button').click();
});

test('Redirect to User Information Return to Details Screen Button', async({ page })=> {
    //#region STEPS
    await page.goto('/dealer-info/idm_user/menu.php');
    await page.locator('a[href="./search.php"]').click();
    await page.locator(`input[onclick*="refer.php?id=${ID}"]`).click();
    await page.locator(`input[onclick*="detail.php?no=1&id=${ID}"]`).click();

    const [new_page] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('input[onclick*="edit_print.php?no=1&id=111034005001"]').click()
    ]);
    await new_page.waitForLoadState('load');
    //#endregion

    //#region ASSERTIONS
    expect(new_page.url()).toContain(`edit_print.php`);
    expect(new_page.url()).toBe(`${process.env.BASEURL}/dealer-info/idm_user/edit_print.php?no=1&id=${ID}`);
    //#endregion
});
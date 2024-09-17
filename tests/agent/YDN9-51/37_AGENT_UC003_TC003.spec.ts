import { test, expect } from '@playwright/test';

const ID = "111034005001";

test.beforeEach(async ({ page }) => {
    await page.goto('/dealer-info/login.php');
    await page.locator('input[name="charge_id"]').fill(process.env.USERID);
    await page.locator('input[name="password"]').fill(process.env.PASSWORD);
    await page.locator('#login_button').click();
});

test('Displays Password change application form', async({ page })=> {
    //#region STEPS
    await page.goto('/dealer-info/idm_user/menu.php');
    await page.locator('a[href="./search.php"]').click();
    await page.locator(`input[onclick*="refer.php?id=${ID}"]`).click();
    await page.locator(`input[onclick*="detail.php?no=1&id=${ID}"]`).click();
    //#endregion

    //#region ASSERTIONS
    //#region DETAILS
    // Fullname kanji
    await expect(page.getByRole('cell', { name: '氏名（漢字）', exact: true })).toBeVisible();
    await expect(page.getByRole('row', { name: '氏名（漢字） 小瀬村 裕', exact: true }).locator('td')).toBeVisible();

    // Lastname
    await expect(page.getByRole('cell', { name: '姓（半角英小文字）', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'hiroshi', exact: true })).toBeVisible();

    // Firstname
    await expect(page.getByRole('cell', { name: '名（半角英小文字）', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'kosemura', exact: true })).toBeVisible();

    // Dealer code
    await expect(page.getByRole('cell', { name: '特約店コード（6桁）', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: '111034', exact: true })).toBeVisible();

    // Distributor name
    await expect(page.getByRole('cell', { name: '特約店名', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'ヤマハビジネスサポート MW事業部', exact: true })).toBeVisible();

    // Distributor phone
    await expect(page.getByRole('cell', { name: '特約店電話番号', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: '111-222-3333', exact: true })).toBeVisible();

    // Distributor email
    await expect(page.getByRole('cell', { name: '電子メールアドレス', exact: true })).toBeVisible();
    await expect(page.getByRole('row', { name: '電子メールアドレス hiroshi.kosemura@music.yamaha.com', exact: true }).locator('td')).toBeVisible();

    // Approver name
    await expect(page.getByRole('cell', { name: '承認者氏名（漢字）', exact: true })).toBeVisible();
    await expect(page.getByRole('row', { name: '承認者氏名（漢字） 小瀬村 裕', exact: true }).locator('td')).toBeVisible();

    // Approver email
    await expect(page.getByRole('cell', { name: '承認者メールアドレス', exact: true })).toBeVisible();
    await expect(page.getByRole('row', { name: '承認者メールアドレス hiroshi.kosemura@music.yamaha.com', exact: true }).locator('td')).toBeVisible();
    
    // UUID
    await expect(page.getByRole('cell', { name: 'UID', exact: true })).toBeVisible();

    // YDEC Image Capture
    await expect(page.getByRole('cell', { name: 'YDEC 画像キャプチャ', exact: true })).toBeVisible();

    // Memorandum
    await expect(page.getByRole('cell', { name: 'メモ', exact: true })).toBeVisible();
    //#endregion 

    //#region BUTTONS
    // Details
    await expect(page.locator('input[onclick*="refer.php?id=111034005001"]')).toBeVisible();
    await expect(page.locator('input[onclick*="refer.php?id=111034005001"]')).toContainText('ユーザー情報 詳細画面に戻る');

    // Edit print
    await expect(page.locator('input[onclick*="edit_print.php?no=1&id=111034005001"]')).toBeVisible();
    await expect(page.locator('input[onclick*="edit_print.php?no=1&id=111034005001"]')).toContainText('印 刷');
    //#endregion
    //#endregion
});
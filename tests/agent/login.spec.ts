import { test, expect } from '@playwright/test';

const cred = {
    username: "111034110",
    password: "yamaha"  
};

test('login', async ({ page }) => {
    //#region LOGIN
    await page.goto('http://localhost:5002/dealer-info/login.php');
    await page.locator('input[name="charge_id"]').fill(cred.username);
    await page.locator('input[name="password"]').fill(cred.password);
    await page.getByRole('button', { name: 'ログイン' }).click();
    //#endregion

    //#region LEFT SIDE
    await expect(page.getByRole('link', { name: 'Yamaha Dealers Net' })).toBeVisible();
    await expect(page.locator('#header-body')).toContainText('Yamaha Dealers Netヤマハ特約店営業情報サイト');
    //#endregion

    //#region CENTER
    await expect(page.getByRole('link', { name: 'YAMAHA', exact: true })).toBeVisible();
    //#endregion

    //#region RIGHT SIDE
    await expect(page.getByText('[ ヤマハ社員権限 ] のID')).toBeVisible();
    await expect(page.locator('#header-body')).toContainText('ログアウト');
    //#endregion

    //#region BUTTONS
    await expect(page.getByRole('link', { name: '営業カレンダー' })).toBeVisible();
    await expect(page.getByRole('navigation')).toContainText('営業カレンダー');

    await expect(page.getByRole('link', { name: 'お問い合わせ' })).toBeVisible();
    await expect(page.getByRole('navigation')).toContainText('お問い合わせ');
    //#endregion

    //#region LEFT MENU
    await expect(page.getByRole('heading', { name: '製品・サービス カテゴリーメニュー' })).toBeVisible();
    await expect(page.getByRole('complementary')).toContainText('製品・サービス カテゴリーメニュー');

    await expect(page.getByRole('link', { name: '新バナー' })).toBeVisible();
    await expect(page.getByRole('link', { name: '新バナー' })).toHaveAttribute('href', '/dealer-info/repair_info/')

    await expect(page.getByRole('link', { name: ' e研修／e検定' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' e研修／e検定' })).toHaveAttribute('href', '/dealer-info/e-training/index.php')

    await expect(page.getByRole('link', { name: ' 各ヤマハシステムのご利用' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' 各ヤマハシステムのご利用' })).toHaveAttribute('href', '/dealer-info/orderandreport/')

    await expect(page.getByRole('link', { name: ' 会議などの申し込み・報告' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' 会議などの申し込み・報告' })).toHaveAttribute('href', '/dealer-info/orderandreport/menu.php')

    await expect(page.getByRole('link', { name: ' Yamaha Dealers Website' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Yamaha Dealers Website' })).toHaveAttribute('href', '/dealer-info/ydw/index.html')
    //#endregion

    //#region SEARCH FORM
    await expect(page.locator('#agentbs_cate')).toBeVisible();
    await expect(page.locator('#agentbs_cate')).toContainText('製品・サービスカテゴリー選択');

    await expect(page.locator('#category_code')).toBeVisible();
    await expect(page.locator('#category_code')).toContainText('項目選択');

    await expect(page.locator('input[name="keyword"]')).toBeVisible();
    await expect(page.locator('input[name="keyword"]')).toHaveAttribute('placeholder', 'キーワード入力');

    await expect(page.locator('#btn-search')).toBeVisible();
    await expect(page.locator('#btn-search')).toContainText('検索');

    await expect(page.getByText('各項目を選択して検索ボタンをクリックすることでトピックスを絞り込むことが可能です。')).toBeVisible();
    //#endregion

    //#region CONTENT
    //#region CONTAINER 1
    await expect(page.getByRole('heading', { name: '重要トピックス 過去6' })).toBeVisible();
    await expect(page.getByText('過去6か月のトピックスのうち新しいものから最大4')).toBeVisible();
    await expect(page.getByRole('link', { name: '重要トピックス一覧' })).toBeVisible();
    
    await expect(page.getByRole('link', { name: '重要トピックス一覧' })).toBeVisible();
    await expect(page.getByRole('link', { name: '重要トピックス一覧' })).toHaveAttribute('href', 'topics_search/topics_search.php?importance=1');
    //#endregion
    
    //#region CONTAINER 2
    await expect(page.getByRole('heading', { name: '最新トピックス 過去6' })).toBeVisible();
    await expect(page.getByText('過去6か月のトピックスのうち新しいものから最大10')).toBeVisible();

    await expect(page.getByRole('cell', { name: '製品・サービスカテゴリー' }).nth(1)).toBeVisible();
    await expect(page.getByRole('cell', { name: '項目カテゴリー' }).nth(1)).toBeVisible();
    await expect(page.getByRole('cell', { name: '日付' }).nth(1)).toBeVisible();
    await expect(page.getByRole('cell', { name: '記事' }).nth(1)).toBeVisible();

    await expect(page.getByRole('link', { name: '全トピックス一覧' })).toBeVisible();
    await expect(page.getByRole('link', { name: '全トピックス一覧' })).toHaveAttribute('href', 'topics_search/topics_search.php');
    //#endregion
    
    //#region CONTAINER 3
    await expect(page.getByRole('link', { name: 'エグゼクティブ トピックス' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'エグゼクティブ トピックス' })).toHaveAttribute('onclick', "post_search_topics('ex')");
    //#endregion

    //#endregion
});
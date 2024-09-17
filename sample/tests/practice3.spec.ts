import { test, expect } from '@playwright/test';

test.only('focus this test', async ({ page }) => {

});

test.skip('skip this test', async ({ page }) => {

});


test.describe('two tests', ()=> {
    test('one', async ({ page }) => {

    });

    test('two', async ({ page }) => {
    });
});
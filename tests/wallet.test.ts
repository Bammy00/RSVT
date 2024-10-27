import { login } from '../utils/helper';
import { test, expect } from '@playwright/test';
import { selectors } from '../utils/selectors';
import { text } from 'stream/consumers';

test.describe('Wallet Tests', () => {

  const loginUrl = '/login';
  const dashboardUrl = '/';

  const validEmail = 'ayobami.eleyinmi@gmail.com';
  const validPassword = 'Pallindrome119#';

  // Navigate to login page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
    await login(page, validEmail, validPassword);
    await expect(page).toHaveURL(dashboardUrl);
    await page.click('text=No,');
    await page.click('text=Okay');
  });

  test('Should successfully access the wallet section of the app and view Balance', async ({ page }) => {

    // Click on the wallet link by text
    const walletLink = page.locator('div#root>div>div>a:nth-of-type(3)');
    await expect(walletLink).toBeVisible();
    await walletLink.click();

    // Verify the URL has changed to the wallet page
    await expect(page).toHaveURL('https://app.risevest.com/wallet');
    
    // Verify the presence of specific text on the wallet page
    await expect(page.locator('text=Withdraw')).toBeVisible();
    await expect(page.locator('text=Fund wallet')).toBeVisible();
    await expect(page.locator('text=Transfer')).toBeVisible();

        // Verify the wallet balance is displayed correctly
        const walletBalance = page.locator('p.mt-3.font-tomato');
        await expect(walletBalance).toHaveText('$0.00');
  });

  test('Should toggle wallet balance visibility', async ({ page }) => {
    // Check if the wallet link is visible before clicking
    const walletLink = page.locator('div#root>div>div>a:nth-of-type(3)');
    await expect(walletLink).toBeVisible();
    await walletLink.click();
    
    // Verify the URL has changed to the wallet page
    await expect(page).toHaveURL('https://app.risevest.com/wallet');
    
    // Verify the wallet balance is initially visible
    const walletBalance = page.locator('p.mt-3.font-tomato');
    await expect(walletBalance).toBeVisible();

    // Click the toggle button to hide the balance
    const toggleButton = page.locator('button.text-primary');
    const walletHidden = page.locator('text=******');
    await toggleButton.click();
    await expect(walletHidden).toBeVisible();

    // Click the toggle button again to show the balance
    await toggleButton.click();
    await expect(walletBalance).toBeVisible();
});

});

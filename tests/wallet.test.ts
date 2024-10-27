import { login } from '../utils/helper';
import { test, expect } from '@playwright/test';
import { WalletPage } from '../pages/wallet.page';
import { selectors } from '../utils/selectors';

test.describe('Wallet Tests', () => {
  const loginUrl = '/login';
  const dashboardUrl = '/';

  const validEmail = 'ayobami.eleyinmi@gmail.com';
  const validPassword = 'Pallindrome119#';

  let walletPage: WalletPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
    await login(page, validEmail, validPassword);
    await expect(page).toHaveURL(dashboardUrl);
    await page.click('text=No,');
    await page.click('text=Okay');
    walletPage = new WalletPage(page);
  });

  test('Should successfully access the wallet section of the app and view Balance', async ({ page }) => {
    await walletPage.navigateToWallet();
    await walletPage.verifyWalletPage();
    await expect(await walletPage.getWalletBalance()).toBe('$0.00');
  });

  test('Should toggle wallet balance visibility', async ({ page }) => {
    await walletPage.navigateToWallet();
    await expect(await walletPage.isBalanceVisible()).toBe(true);

    await walletPage.toggleBalanceVisibility();
    await expect(await walletPage.isBalanceHidden()).toBe(true);

    await walletPage.toggleBalanceVisibility();
    await expect(await walletPage.isBalanceVisible()).toBe(true);
  });
});

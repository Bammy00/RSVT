import { test, expect } from '@playwright/test';
import { setupWallet } from '../utils/hooks';
import { WalletPage } from '../pages/wallet.page';


test.describe('Wallet Tests', () => {
  let walletPage: WalletPage;

  test.beforeEach(async ({ page }) => {
    walletPage = await setupWallet(page);
  });

  test('Should successfully access the wallet section of the app and view Balance', async () => {
    await walletPage.navigateToWallet();
    await walletPage.verifyWalletPage();
    await expect(await walletPage.getWalletBalance()).toBe('$0.00');
  });

  test('Should toggle wallet balance visibility', async () => {
    await walletPage.navigateToWallet();
    await expect(await walletPage.isBalanceVisible()).toBe(true);

    await walletPage.toggleBalanceVisibility();
    await expect(await walletPage.isBalanceHidden()).toBe(true);

    await walletPage.toggleBalanceVisibility();
    await expect(await walletPage.isBalanceVisible()).toBe(true);
  });
});

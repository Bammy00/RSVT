// page-objects/WalletPage.ts
import { Page } from '@playwright/test';
import { selectors } from '../utils/selectors';

export class WalletPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToWallet() {
    await this.page.click(selectors.walletLink);
    await this.page.waitForURL('https://app.risevest.com/wallet');
  }

  async verifyWalletPage() {
    await this.page.waitForSelector(selectors.withdrawText);
    await this.page.waitForSelector(selectors.fundWalletText);
    await this.page.waitForSelector(selectors.transferText);
  }

  async getWalletBalance() {
    return this.page.locator(selectors.walletBalance).textContent();
  }

  async toggleBalanceVisibility() {
    await this.page.click(selectors.toggleButton);
  }

  async isBalanceHidden() {
    return this.page.locator(selectors.walletHidden).isVisible();
  }

  async isBalanceVisible() {
    return this.page.locator(selectors.walletBalance).isVisible();
  }
}

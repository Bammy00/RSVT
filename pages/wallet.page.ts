import { Page } from '@playwright/test';

export class WalletPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/wallet');
  }

  async getBalance() {
    return this.page.textContent('.wallet-balance');
  }

  async toggleBalanceVisibility() {
    await this.page.click('.toggle-balance-visibility');
  }

  async addFunds(amount: string) {
    await this.page.click('.add-funds-button');
    await this.page.fill('input[name="amount"]', amount);
    await this.page.click('button[type="submit"]');
  }

  async withdrawFunds(amount: string) {
    await this.page.click('.withdraw-funds-button');
    await this.page.fill('input[name="amount"]', amount);
    await this.page.click('button[type="submit"]');
  }
}

// LoginPage.ts
import { Page } from '@playwright/test';
import { selectors } from '../utils/selectors';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(selectors.email, email);
    await this.page.fill(selectors.password, password);
    await this.page.click(selectors.submitButton);
  }

  async togglePasswordVisibility() {
    await this.page.click(selectors.togglePasswordButton);
  }

  async getEmailError() {
    return this.page.locator(selectors.emailError).textContent();
  }

  async getPasswordError() {
    return this.page.locator(selectors.passwordError).textContent();
  }

  async getErrorMessage() {
    return this.page.locator(selectors.errorMessage).textContent();
  }

  async getPasswordInputType() {
    return this.page.locator(selectors.password).getAttribute('type');
  }
}
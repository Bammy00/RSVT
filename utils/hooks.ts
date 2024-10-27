// utils/hooks.ts
import { Page } from '@playwright/test';
import { login } from '../utils/helper';
import { WalletPage } from '../pages/wallet.page';
import { LoginPage } from '../pages/login.page';

const loginUrl = '/login';
const dashboardUrl = '/';

const validEmail = 'ayobami.eleyinmi@gmail.com';
const validPassword = 'Pallindrome119#';

export async function setupWallet(page: Page): Promise<WalletPage> {
  await page.goto(loginUrl);
  await login(page, validEmail, validPassword);
  await page.waitForURL(dashboardUrl);
  await page.click('text=No,');
  await page.click('text=Okay');
  return new WalletPage(page);
}

export async function setupLogin(page: Page): Promise<LoginPage> {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await page.waitForURL(loginUrl);
  return loginPage;
}

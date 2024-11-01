import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';

dotenv.config();


test.describe('Login Tests', () => {
  const loginUrl = '/login';
  const dashboardUrl = '/';

  const validEmail = process.env.VALID_EMAIL!;
  const validPassword = process.env.VALID_PASSWORD!;

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page).toHaveURL(loginUrl);
  });

  test('should show error messages for blank submission', async ({ page }) => {
    await loginPage.login('', '');
    await expect(await loginPage.getEmailError()).toBe('Enter your email address');
    await expect(await loginPage.getPasswordError()).toBe('Enter your password');
  });

  test('should show error message for invalid email', async ({ page }) => {
    await loginPage.login('invalid.risevestemail@yopmail', 'invalidPassword');
    await expect(await loginPage.getEmailError()).toBe('Enter a valid email address');
  });
  

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(validEmail, validPassword);
    //await expect(page).toHaveURL(dashboardUrl);
  });

  test('should toggle password visibility', async ({ page }) => {
    await loginPage.login('hello@email.com', validPassword);
    await page.waitForTimeout(5000); // waits for 5 seconds
    await loginPage.togglePasswordVisibility();
    await expect(await loginPage.getPasswordInputType()).toBe('text');
    await loginPage.togglePasswordVisibility();
    await expect(await loginPage.getPasswordInputType()).toBe('password');
  });
});
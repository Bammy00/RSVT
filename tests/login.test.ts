import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  const loginUrl = '/login';
  const dashboardUrl = '/';

  const validEmail = 'ayobami.eleyinmi@gmail.com';
  const validPassword = 'Pallindrome119#';

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
    await page.waitForNavigation({ timeout: 10000 }); // Wait for navigation with increased timeout
    console.log(await page.url()); // Log the current URL
    await expect(page).toHaveURL(dashboardUrl);
  });

  test('should toggle password visibility', async ({ page }) => {
    await loginPage.login('', validPassword);
    await loginPage.togglePasswordVisibility();
    await expect(await loginPage.getPasswordInputType()).toBe('text');
    await loginPage.togglePasswordVisibility();
    await expect(await loginPage.getPasswordInputType()).toBe('password');
  });
});

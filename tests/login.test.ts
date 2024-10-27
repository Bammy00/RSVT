import { test, expect } from '@playwright/test';
import { selectors } from '../utils/selectors';

test.describe('Login Tests', () => {
  const loginUrl = '/login';
  const dashboardUrl = '/';

  const validEmail = 'ayobami.eleyinmi@gmail.com';
  const validPassword = 'Pallindrome119#';

  // Navigate to login page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
  });

  test('should show error messages for blank submission', async ({ page }) => {
    await page.click(selectors.submitButton);
    await expect(page.locator(selectors.emailError)).toHaveText('Enter your email address');
    await expect(page.locator(selectors.passwordError)).toHaveText('Enter your password');
  });

  test('should show error message for invalid email or password', async ({ page }) => {
    await page.fill(selectors.email, 'invalid.risevestemail@yopmail.com');
    await page.fill(selectors.password, 'invalidPassword');
    await page.click(selectors.submitButton);
    await expect(page.locator(selectors.errorMessage)).toHaveText('Invalid email or password.');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill(selectors.email, validEmail);
    await page.fill(selectors.password, validPassword);
    await page.click(selectors.submitButton);
    await expect(page).toHaveURL(dashboardUrl);
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.fill(selectors.password, validPassword);
    await page.click(selectors.togglePasswordButton); // Toggle visibility
    const passwordInput = await page.locator(selectors.password);
    await expect(passwordInput).toHaveAttribute('type', 'text'); // Password should be visible
    await page.click(selectors.togglePasswordButton); // Toggle visibility back
    await expect(passwordInput).toHaveAttribute('type', 'password'); // Password should be hidden
  });
});

import { login } from '../utils/helper';
import { test, expect } from '@playwright/test';

test.describe('Plans Tests', () => {

  const loginUrl = '/login';
  const dashboardUrl = '/';
  const plansUrl = 'https://app.risevest.com/plans';

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

  test('Should view plans', async ({ page }) => {
    // Navigate to the plans page
    const plansLink = page.locator('div#root>div>div>a:nth-of-type(2)');
    await expect(plansLink).toBeVisible();
    await plansLink.click();
    await expect(page).toHaveURL(plansUrl);

    // Verify the presence of plans or the no plans message
    const noPlansMessage = page.locator('text=You have not created any plans. Click on any of the cards below to create a plan');
    const existingPlans = page.locator('div.plan-details'); // Adjust the selector based on actual plan details element

    if (await noPlansMessage.isVisible()) {
      await expect(noPlansMessage).toBeVisible();
    } else {
      await expect(existingPlans).toBeVisible();
    }
  });

//   test('Should create a new plan', async ({ page }) => {
//     // Navigate to the plans page
//     const plansLink = page.locator('div#root>div>div>a:nth-of-type(2)');
//     await expect(plansLink).toBeVisible();
//     await plansLink.click();
//     await expect(page).toHaveURL(plansUrl);

//     // Start creating a new plan
//     await page.click('a._buildWealthPlanCard_1rcc3_32._planCard_1rcc3_1');
//     //await page.click('button[jf-ext-button-ct="start investing"]');
//     await page.click('button:has-text("start investing")', { force: true });
//     await page.click('text=Nigerian Naira');
//     await expect(page.locator('text=Name your plan')).toBeVisible();

//     // Fill in the plan details
//     await page.fill('#name', 'test plan1');
//     await page.click('button:has-text("continue")', { force: true });
//     await expect(page.locator('h2:has-text("Income")')).toBeVisible();
//     await page.click('#name');
//     await page.fill('#name', '50000');
//     await page.click('button:has-text("continue")', { force: true });
//     await expect(page.locator('text=Savings')).toBeVisible();
//     await page.fill('input[name="savings"]', '50');
//     await page.click('button:has-text("continue")', { force: true });
//     await expect(page.locator('text=Retirement Age')).toBeVisible();
//     await page.fill('input[name="savings"]', '60');
//     await page.click('button:has-text("continue")', { force: true });
//     await expect(page.locator('text=Preferences')).toBeVisible();
//     await page.click('input[jf-ext-cache-id="7"]'); // Adjust based on preference selection
//     await page.click('button:has-text("continue")', { force: true });
//     await expect(page.locator('text=Your Portfolio')).toBeVisible();
//     await page.click('button:has-text("continue")', { force: true });
//     await expect(page.locator('text=Projection')).toBeVisible();
//     await page.click('button[jf-ext-button-ct="agree & continue"]');
//     await expect(page.locator('text=Review')).toBeVisible();
//     await page.click('button[jf-ext-button-ct="create plan"]');
//     await expect(page.locator('text=You just created your Build Wealth plan')).toBeVisible();
//     await page.click('button[jf-ext-button-ct="view plan"]');
//     await expect(page.locator('text=Would you like to add money now?')).toBeVisible();
//     await page.click('button[jf-ext-button-ct="no, later"]');

//     // Verify the plan details
//     await expect(page.locator('text=Reinvest After Maturity')).toBeVisible();
//     await expect(page.locator('text=Portfolio')).toBeVisible();
//     await expect(page.locator('text=Auto-Invest')).toBeVisible();
//     await expect(page.locator('text=Plan Created On')).toBeVisible();
//     await expect(page.locator('text=Expected Annual Return')).toBeVisible();
//     await expect(page.locator('text=Total deposit')).toBeVisible();
//     await expect(page.locator('text=Total Earnings')).toBeVisible();
//     await expect(page.locator('text=Recent Earnings')).toBeVisible();
//     await expect(page.locator('text=Total Withdrawals')).toBeVisible();
//     await expect(page.locator('text=Plan Maturity Date')).toBeVisible();
//   });

  test('Should delete a plan', async ({ page }) => {
    // Navigate to the plans page
    const plansLink = page.locator('div#root>div>div>a:nth-of-type(2)');
    await expect(plansLink).toBeVisible();
    await plansLink.click();
    await expect(page).toHaveURL(plansUrl);

    // Check if a plan is available
    const userPlan = page.locator('a[data-test-id="user-plan"]');
    if (await userPlan.isVisible()) {
      await userPlan.click();
      await page.click('button[jf-ext-button-ct="open plan options menu"]');
      await page.click('button[jf-ext-button-ct="no, later"]');
      await page.click('button[jf-ext-button-ct="open plan options menu"]');
      await page.click('button[jf-ext-button-ct="delete plan"]');
      await page.click('button[jf-ext-button-ct="yes"]');
      await expect(page.locator('#notistack-snackbar')).toBeVisible();
    } else {
      console.log('No plan found');
    }
  });

});

import { login, clickRandomOption } from '../utils/helper';
import { selectors } from '../utils/selectors';
import { test, expect } from '@playwright/test';

test.describe('Plans Tests', () => {

  const validEmail = 'ayobami.eleyinmi@gmail.com';
  const validPassword = 'Pallindrome119#';

  // Navigate to login page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
    await login(page, validEmail, validPassword);
    await expect(page).toHaveURL('/');
    await page.click('text=No,');
    await page.click('text=Okay');
  });

  test('Should view plans', async ({ page }) => {
    // Navigate to the plans page
    const plansLink = page.locator(selectors.plansLink);
    await expect(plansLink).toBeVisible();
    await plansLink.click();
    await expect(page).toHaveURL('https://app.risevest.com/plans');
  
    // Verify the presence of plans or the no plans message
    const noPlansMessage = page.locator(selectors.noPlansMessage);
    const existingPlans = page.locator(selectors.existingPlans);
  
    if (await noPlansMessage.isVisible()) {
      await expect(noPlansMessage).toBeVisible();
      console.log('No plans found');
    } else {
      const plansCount = await existingPlans.count();
      if (plansCount > 0) {
        console.log('Plans are visible');
        for (let i = 0; i < plansCount; i++) {
          await expect(existingPlans.nth(i)).toBeVisible();
        }
      } else {
        console.log('No plans found');
      }
    }
  });

  test('Should create a new plan', async ({ page }) => {
    // Navigate to the plans page
    const plansLink = page.locator(selectors.plansLink);
    await expect(plansLink).toBeVisible();
    await plansLink.click();
    await expect(page).toHaveURL('https://app.risevest.com/plans');

    // Start creating a new plan
    await page.click(selectors.buildWealthPlanCard);
    await page.click(selectors.startInvestingButton, { force: true });
    await page.click(selectors.nigerianNairaOption);
    await expect(page.locator('text=Name your plan')).toBeVisible();

    // Fill in the plan details
    await page.fill(selectors.nameInput, 'test plan1');
    await page.click(selectors.continueButton, { force: true });
    await expect(page.locator('h2:has-text("Income")')).toBeVisible();
    await page.click(selectors.nameInput);
    await page.fill(selectors.nameInput, '50000');
    await page.click(selectors.continueButton, { force: true });
    await expect(page.locator('text=Savings')).toBeVisible();
    await page.fill(selectors.savingsInput, '50');
    await page.waitForTimeout(3000); // Waits for 3 seconds
    await page.click(selectors.continueButton, { force: true });
    await page.waitForTimeout(3000); // Waits for 3 seconds

    await expect(page.locator(selectors.retirementAgeWarning)).toBeVisible();
    await page.fill(selectors.savingsInput, '60');
    await page.waitForTimeout(3000); // Waits for 3 seconds
    await page.click(selectors.continueButton, { force: true });

    await expect(page.locator(selectors.preferencesText)).toBeVisible();
    await clickRandomOption(page);
    await page.click(selectors.continueButton, { force: true });
    await expect(page.locator(selectors.yourPortfolioText)).toBeVisible();
    await page.waitForTimeout(3000); // Waits for 3 seconds

    await page.click(selectors.continueButton, { force: true });
    await expect(page.locator(selectors.projectionText)).toBeVisible();
    await page.click(selectors.agreeAndContinueButton, { force: true });
    await expect(page.locator(selectors.reviewText)).toBeVisible();
    await page.click(selectors.createPlanButton, { force: true });
    await expect(page.locator(selectors.buildWealthPlanCreatedText)).toBeVisible();
    await page.waitForTimeout(3000); // Waits for 3 seconds
    await expect(page.locator(selectors.buildWealthPlanCreatedText)).toBeVisible();
  });

});

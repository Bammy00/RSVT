import { Page } from '@playwright/test';

export class PlansPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/plans');
  }

  async createPlan(amount: string, investmentType: string) {
    await this.page.click('button.new-plan');
    await this.page.fill('input[name="amount"]', amount);
    await this.page.selectOption('select[name="investmentType"]', investmentType);
    await this.page.click('button[type="submit"]');
  }

  async getPlans() {
    return this.page.$$eval('.plan', plans => plans.map(plan => plan.textContent));
  }

  async deletePlan(planName: string) {
    const plan = await this.page.$(`.plan:has-text("${planName}")`);
    if (plan) {
      await plan.click('.delete-button');
    }
  }
}

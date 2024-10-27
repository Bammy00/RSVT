// utils/helpers.ts
import { Page } from '@playwright/test';


export async function login(page: Page, email: string, password: string): Promise<void> {
  const selectors = {
    email: '#email',
    password: '#password',
    submitButton: 'button[type="submit"]'
  };

  await page.fill(selectors.email, email);
  await page.fill(selectors.password, password);
  await page.click(selectors.submitButton);
  await page.waitForNavigation(); // Wait for navigation to ensure login is complete
}

// Helper function to randomly click one of the options
async function clickRandomOption(page: Page): Promise<void> {
  const options: string[] = ['Capital Growth', 'Stability', 'Safety'];
  const randomOption: string = options[Math.floor(Math.random() * options.length)];
  await page.click(`text=${randomOption}`);
}

export { clickRandomOption };

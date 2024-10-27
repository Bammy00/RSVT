// utils/helpers.js
export async function login(page, email, password) {
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
  
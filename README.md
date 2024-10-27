
# QA Engineer Test - Risevest Web App

This repository contains automated tests for the Risevest Web App. The tests are written using Playwright and Typescript and follow the Page Object Model design pattern.

## Project Structure 📁

The project structure includes the following directories:

- **.github/workflows**: GitHub Actions workflow configuration.
- **tests**: Contains test files.
  - **pages**: Page objects for interacting with web elements.
  - **utils**: Utility functions.

## Setup ⚙️

Clone this repository to your local machine.

Install dependencies using npm:

```bash
npm install
```

## Scripts 📜

- `npm run lint`: Lints TypeScript and JavaScript files.
- `npm run lint:fix`: Fixes linting issues.
- `npm test`: Runs tests.

## Dev Dependencies 🛠️

- [your chosen framework]: Testing framework.
- @types/node: TypeScript type definitions for Node.js.
- @typescript-eslint/eslint-plugin and @typescript-eslint/parser: ESLint plugins for TypeScript.
- allure-commandline: Allure report generator.
- allure-[your chosen framework]: Allure integration for the testing framework.
- eslint, eslint-config-prettier, eslint-plugin-[your chosen framework]: Linting tools.
- typescript: TypeScript compiler.

## Running Tests ▶️

Run the tests with:

```bash
npm test
```

## Reporting 📊

Test results are generated in the allure-report directory. You can view the report by running:

```bash
npx allure serve
```

## Objective

This test assessed the ability to design and implement automated tests for web applications. The functionality of the Risevest Web App (https://app.risevest.com) was evaluated by creating automated tests/scripts.

## Requirements

The automated tests/scripts covered the following user flows:

### Login

- Successfully logged in to the Risevest Web App using valid credentials.
- Handled invalid credentials (incorrect username/password) and verified appropriate error messages.

### View Wallet

- Accessed the wallet section of the application.
- Verified that the wallet balance is displayed correctly.

### Show/Hide Wallet Balance

- Tested the functionality that allows users to show or hide their wallet balance.
- Ensured the balance is hidden/shown as expected when the corresponding button/toggle is clicked.

### View Plans

- Navigated to the section where users can view their investment plans.
- Verified that existing plans (if any) are displayed correctly with relevant details.

### Create a Plan

- Completed the process of creating a new investment plan.
- This included filling in the required information (e.g., amount, investment type) and submitting the form.
- Verified that the new plan was successfully created and displayed in the list of plans.


# Playwright-Automation
Playwright is a framework for Web Testing and Automation. It is built to enable cross-browser web automation that is reliable and fast. Playwright, also has its own test runner for end-to-end tests called Playwright Test.

# How to Start
1. Clone the project
2. Run `npm i` to install all the dependencies
3. Run `npx playwright test` to execute the tests
4. Run `npx playwright test tests/1-inputText.spec.ts` to execute a single test
5. To generate Allure HTML Reports:
    - Run `npx playwright test --reporter=line,allure-playwright`
    - Run `npm run allure:generate`
    

import { BrowserContext, Page, expect, test } from '@playwright/test';
import Login from '../selectors/Login.json';
import Logged from '../selectors/Logged.json';
import { credentials } from '../utils/variables.ts';

let page: Page;

test.describe('Logged page', () => {
  let context: BrowserContext;

  test.beforeEach('Login', async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(credentials.base_url);
    
    await page.locator(Login.username_input).waitFor();
    await page.locator(Login.username_input).fill(credentials.userName);
    await page.locator(Login.password_input).waitFor();
    await page.locator(Login.password_input).fill(credentials.password);
    await page.locator(Login.login_button).click();
  });

  test.afterEach('Logout', async () => {
    await page.locator(Logged.sign_out_butoon).click();
    await page.close();
    await context.close();
  });

  test('Create a new Todo', async () => {
    await page.locator(Logged.title_field).waitFor();
    await page.locator(Logged.title_field).fill("Todo Title field");
    await page.locator(Logged.details_field).waitFor();
    await page.locator(Logged.details_field).fill("Todo details field");
    await page.locator(Logged.add_button).click();

    await page.locator(Logged.todo_element_title).nth(0).waitFor();
    const todo_title = await page.locator(Logged.todo_element_title).nth(0).textContent();
    const todo_datails = await page.locator(Logged.todo_element_title).nth(0).textContent();
    await expect(todo_title).toEqual("Todo Title field");
    await expect(todo_datails).toEqual("Todo details field");
  });

});
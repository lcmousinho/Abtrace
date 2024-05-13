import { BrowserContext, test, Page } from '@playwright/test';
import { todoService } from '../services/request_service.page.ts';
import { tokenService } from '../services/token_service';
import Login from '../selectors/Login.json';
import Logged from '../selectors/Logged.json';
import { expect } from 'chai';
import { credentials } from '../utils/variables.ts';

let page: Page;
const userId = "luiz";

test.describe('API test', () => {
    let context: BrowserContext;
    let service: todoService;
    let getToken: tokenService;

    test("Validate api response", async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        getToken = new tokenService();

        //Perform login to get token
        await page.goto(credentials.base_url);
    
        await page.locator(Login.username_input).waitFor();
        await page.locator(Login.username_input).fill(credentials.userName);
        await page.locator(Login.password_input).waitFor();
        await page.locator(Login.password_input).fill(credentials.password);
        await page.locator(Login.login_button).click();
        await page.locator(Logged.title_field).waitFor();
    
        //Get token
        let token = await getToken.getToken(page);

        service = new todoService();
        let getResult = await service.getChai(userId, token);

        expect(getResult.status).to.equal(200);
    });
});
import test from "@playwright/test";
import { LoginPage } from "../pages/login";
import { Utils } from "../pages/utils";

test.describe("Login Function Testing", () => {
    let loginPage: LoginPage;
    let util: Utils
    test.beforeEach(async({ page}) => {
        loginPage = new LoginPage(page)
        util = new Utils(page)

        await util.goTo('https://www.demoblaze.com')
    })

    test("Valid Login", async() => {
        await loginPage.login('qwerty55ee', 'qwerty55ee')
        await loginPage.expectLoginSuccess('qwerty55ee')
    })
})
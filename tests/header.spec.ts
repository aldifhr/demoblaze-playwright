import test from "@playwright/test"
import { Header } from "../components/header"
import { Utils } from "../pages/utils";
import { LoginPage } from "../pages/login";

test.describe('Header / Navbar', () => {
    let header: Header;
    let util: Utils
    let login: LoginPage;
    test.beforeEach(async({ page }) => {
        header = new Header(page)
        util = new Utils(page)
        login = new LoginPage(page)
        
        await util.goTo('https://www.demoblaze.com')
    })
    test('Should show correct menu when user is logged out', async ({ page }) => {
        await header.expectLoggedOutState()
    })

    test('Should show correct menu after login', async ({ page }) => {
        await header.expectLoggedInState('qwerty55ee')
    })

    test('Should return to logged out state after logout', async ({ page }) => {
        await login.login('qwerty55ee', 'password123')
        await header.logoutUser()

        await header.expectLoggedOutState()
    })
})

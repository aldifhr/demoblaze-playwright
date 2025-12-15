import { expect, Locator, Page } from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly home: Locator;
    readonly contact: Locator;
    readonly aboutus: Locator;
    readonly cart;
    readonly login;
    readonly signup;
    readonly logout;
    readonly welcomeUser;

    constructor(page: Page) {
        this.page = page
        this.home = page.getByRole('link', { name: 'Home' })
        this.contact = page.getByRole('link', { name: 'Contact' })
        this.aboutus = page.getByRole('link', { name: 'About us' })
        this.cart = page.locator('#cartur')
        this.login = page.locator('#login2')
        this.signup = page.locator('#signin2')
        this.logout = page.locator('#logout2')
        this.welcomeUser = page.locator('#nameofuser')
    }

    async expectLoggedInState(username: string) {
        await this.page.waitForFunction(
            (username) => {
                const user = localStorage.getItem('user')
                return user && user.includes(username)
            },
            username,
            { timeout: 10_000 }
        )
    }

    async logoutUser() {
        await this.page.evaluate(() => localStorage.clear())
        await this.page.reload()
    }

    async expectLoggedOutState() {
        await this.page.waitForFunction(() => {
            return !localStorage.getItem('user')
        })
    }

}
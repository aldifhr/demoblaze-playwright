import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page
    readonly loginHdr: Locator
    readonly loginModal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly closeBtn: Locator;

    constructor(page: Page) {
        this.page = page
        this.loginHdr = page.locator('#login2')
        this.loginModal = page.locator('#logInModal')
        this.usernameInput = page.locator('#loginusername')
        this.passwordInput = page.locator('#loginpassword')
        this.loginBtn = page.getByRole('button', { name: 'Log in' })
        this.closeBtn = page.getByRole('button', { name: 'Close' })
    }

    async verifyModalIsVisible() {
        await expect(this.loginModal).toBeVisible()
    }

    async login(username?: string, password?: string) {
        await this.loginHdr.click()
        await this.verifyModalIsVisible()
        await this.usernameInput.fill(username || '')
        await this.passwordInput.fill(password || '')
        await this.loginBtn.click()
    }

    async verify(message: string, expectedUrl?: string) {

        const promiseDialog = await this.page.waitForEvent('dialog')
        await expect(promiseDialog.message()).toBe(message)

    }

    async expectLoginSuccess(username: string) {
        const welcomeUser = this.page.locator('#nameofuser')

        await expect(welcomeUser).toBeVisible()
        await expect(welcomeUser).toHaveText(`Welcome ${username}`)
    }
}
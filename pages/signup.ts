import { Locator, Page, expect } from "@playwright/test"

export class SignUpPage {
    readonly page: Page
    readonly signupHdr: Locator;
    readonly signupModal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signupBtn: Locator;
    readonly signupCls: Locator;

    constructor(page: Page) {
        this.page = page
        this.signupHdr = page.locator('#signin2')
        this.signupModal = page.locator('#signInModal')
        this.usernameInput = page.locator('#sign-username')
        this.passwordInput = page.locator('#sign-password')
        this.signupBtn = page.getByRole('button', { name: 'Sign up' })
        this.signupCls = page.getByRole('button', { name: 'Close' })
    }

    async verifyModalisVisible() {
        await expect(this.signupModal).toBeVisible({ timeout: 5000 });
    }

    async signUpAccount(username?: string, password?: string) {
        await this.signupHdr.click()
        await this.verifyModalisVisible()
        await this.usernameInput.fill(username || '')
        await this.passwordInput.fill(password || '')
        await this.signupBtn.click()

        
    }

    async verifyData(message: string) {
        const promiseDialog = await this.page.waitForEvent('dialog')

        await expect(promiseDialog.message()).toBe(message)
        await promiseDialog.accept()
    }
}
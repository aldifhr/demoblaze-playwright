import { test } from "@playwright/test"
import { SignUpPage } from "../pages/SignUp"
import { Utils } from "../pages/utils"

test.describe("Sign Up Page Test", () => {
    let signup: SignUpPage

    test.beforeEach(async ({ page }) => {
        const util = new Utils(page)
        signup = new SignUpPage(page)

        await util.goTo('https://www.demoblaze.com')
    })

    test("Register User with unregistered username and password", async () => {
        await signup.signUpAccount('fhrcn12121z', 'fhrcn123')
        await signup.verifyData('Sign up successful.')
    })

    test("Register User with already registered username and password", async () => {
        await signup.signUpAccount('fhrcn', 'fhrcn123')
        await signup.verifyData('This user already exist.')
    })

    test("Registered User with empty username and password", async () => {
        await signup.signUpAccount()
        await signup.verifyData('Please fill out Username and Password.')
    })

    test("Registered User with valid username and empty password", async () => {
        await signup.signUpAccount('fhrcn')
        await signup.verifyData('Please fill out Username and Password.')
    })
})
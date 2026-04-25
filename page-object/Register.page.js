import { test } from "@playwright/test";
import {userData as testData} from "../data/testData";

export class RegisterPage {
    constructor(page) {
        this.page = page;
        // Using shorthand for IDs
        this.registerButton = page.locator('#login-register-button');
        this.firstNameField = page.locator('#register-first-name');
        this.lastNameField = page.locator('#register-last-name');
        this.emailField = page.locator('#register-email');
        this.passwordField = page.locator('#register-password');
        this.cityField = page.locator('#register-city');
        this.countryDropDown = page.locator('#register-country');
        this.phoneField = page.locator('#register-phone');
        this.streetField = page.locator('#register-street');
        this.zipField = page.locator('#register-zip');
        this.submitButton = page.locator('#register-button');
    }

    async navigate() {
        await this.page.goto('https://aqa-app.vercel.app/login');
    }

    async fillRegistrationForm(testData) {
        await this.registerButton.click();

        // Playwright auto-waits for these, so no need for .waitFor()
        await this.firstNameField.fill(testData.firstName);
        await this.lastNameField.fill(testData.lastName);
        await this.emailField.fill(testData.email);
        await this.passwordField.fill(testData.password);
        await this.cityField.fill(testData.city);
        await this.countryDropDown.selectOption({ label: testData.country });
        await this.phoneField.fill(testData.phone);
        await this.streetField.fill(testData.street);
        await this.zipField.fill(testData.zip);
        await this.submitButton.click();
    }
}

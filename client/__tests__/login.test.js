
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox');


describe("add first test", function () {
    it("successfully adds user", async function () {
        // Set up Firefox browser options
        const options = new firefox.Options();
        // options.setBinary('/Users/khatiazitanishvili/Desktop/geckodriver/geckodriver'); // Set the path to the Firefox binary if needed

        // Create a new WebDriver instance
        const driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

        await driver.get('http://localhost:3000');

        // Test login dialog opening
        let loginBtn = await driver.findElement(By.linkText('Anmelden'));

        await loginBtn.click();
        // await driver.findElement(By.linkText('login')).click();

        // Test login form submission with valid credentials
        let emailInput = await driver.findElement(By.id('email'));
        await emailInput.sendKeys('John@doe.com');
        let passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('12abcAB!');
        await driver.findElement(By.xpath("//button[contains(text(), 'Continue')]")).click();

        let element = await driver.findElement(By.xpath('//*[text()="Event Erstellen"]'));
        let text = await element.getText();

        assert.strictEqual(text, "Event Erstellen")
        await driver.quit();
    })
})






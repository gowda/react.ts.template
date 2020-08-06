import { By, until } from 'selenium-webdriver';
import {
  Given, Then, After,
} from 'cucumber';

import * as selenium from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { expect } from 'chai';

After(function () {
  if (this.driver) {
    return this.driver.quit().then((resp: any) => {
      this.driver = null;
      return resp;
    });
  }

  return null;
});

Given('I navigate to the url {string}', function (path: string) {
  const chromeOptions = new chrome.Options().headless();
  chromeOptions.addArguments('window-size=1440,900');

  this.driver = new selenium.Builder()
    .withCapabilities(selenium.Capabilities.chrome())
    .setChromeOptions(chromeOptions)
    .build();

  return this.driver.get(`file://${__dirname}/../../dist/${path}`);
});

Then('I should see the text {string}', function (expected) {
  const world = this;

  return world.driver.wait(until.elementLocated(By.tagName('h1')))
    .then((node: selenium.WebElement) => node.getText())
    .then((text: string) => expect(text).to.have.string(expected));
});

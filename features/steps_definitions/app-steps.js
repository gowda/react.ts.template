import { By, until } from 'selenium-webdriver';
import {
  Given, Then, After,
} from 'cucumber';

import * as seleniumWebdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { expect } from 'chai';

require('chromedriver');

After(function() {
  if (this.driver) {
    return this.driver.quit().then((resp) => {
      this.driver = null;
      return resp;
    });
  }

  return null;
});

Given('I navigate to the url {string}', function(url) {
  const chromeOptions = new chrome.Options().headless();
  chromeOptions.addArguments('window-size=1440,900');

  this.driver = new seleniumWebdriver.Builder()
    .withCapabilities(seleniumWebdriver.Capabilities.chrome())
    .setChromeOptions(chromeOptions)
    .build();

  return this.driver.get(url);
});

Then('I should see the text {string}', function(expected) {
  const world = this;

  return world.driver.findElement(By.tagName('h1'))
    .then((node) => world.driver.wait(until.elementIsVisible(node)))
    .then((node) => node.getText())
    .then((text) => expect(text).to.have.string(expected));
});

import { browser, element, by } from 'protractor';

export class CounterCardPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-component h1')).getText();
  }
}

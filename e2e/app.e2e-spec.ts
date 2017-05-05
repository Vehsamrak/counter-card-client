import { CounterCardPage } from './app.po';

describe('counter-card App', () => {
  let page: CounterCardPage;

  beforeEach(() => {
    page = new CounterCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

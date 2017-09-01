import { BrowserStackPage } from './app.po';

describe('browser-stack App', () => {
  let page: BrowserStackPage;

  beforeEach(() => {
    page = new BrowserStackPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

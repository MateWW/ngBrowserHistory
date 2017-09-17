import {BrowsingHistory} from './browser-history.strore';

describe('BrowserHistoryStorage', () => {
  let storage;
  beforeEach(() => {
    window.localStorage.setItem('ngBrowserStack', '');
    storage = new BrowsingHistory();
  });

  it('should not save data', () => {
    storage.addStack('test/url/test');
    storage.saveStack(false);
    expect(localStorage.getItem('ngBrowserStack')).toBe('');
  });

  it('should save data after it was change', () => {
    storage.addStack('test/url/test');
    storage.saveStack(true);
    expect(localStorage.getItem('ngBrowserStack')).toBe(JSON.stringify(storage.getStack()));
  });

  it('should save data every it was change', () => {
    storage.saveStack(true);
    storage.addStack('test/url');
    expect(localStorage.getItem('ngBrowserStack')).toBe(JSON.stringify(storage.getStack()));
    storage.addStack('test/url/test');
    expect(localStorage.getItem('ngBrowserStack')).toBe(JSON.stringify(storage.getStack()));
  });

  it('should load storage', () => {
    storage.addStack('test/url');
    storage.addStack('test/url/test');
    const tempStorageTemplate = JSON.stringify(storage.getStack());
    localStorage.setItem('ngBrowserStack', tempStorageTemplate);
    const tempStorage = new BrowsingHistory();
    expect(JSON.stringify(tempStorage.getStack())).toBe(tempStorageTemplate);
  });

  it('should change saveStatus after successful load', () => {
    storage.saveStack(true);
    storage.addStack('test');
    const tempStorage = new BrowsingHistory();
    expect(tempStorage.getSaveStackStatus()).toBe(true);
  });

  it('should try load unexisted data', () => {
    localStorage.removeItem('ngBrowserStack');
    const tempStorage = new BrowsingHistory();
    expect(tempStorage.getStack().length).toBe(0);
  });

  it('should add stack element', () => {
    const stackSize = storage.getStack().length;
    storage.addStack('test');
    expect(storage.getStack().length).toBe(stackSize + 1);
  });

  it( 'should clear stack', () => {
    storage.addStack('test/url/test');
    storage.addStack('test/url/test/test');
    storage.saveStack(true);
    expect(storage.getStack().length).toBe(2);
    let tempStorage = new BrowsingHistory();
    expect(tempStorage.getStack().length).toBe(2);
    tempStorage.cleanStack();
    expect(tempStorage.getStack().length).toBe(0);
  });


});


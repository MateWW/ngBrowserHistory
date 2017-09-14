import {HistoryElement} from './interfaces';

export class BrowsingHistory {

  private historyStack: HistoryElement[] = <HistoryElement[]>[];
  private _saveStack = false;
  private _localStorageKey = 'ngBrowserStack';

  constructor() {
    this.loadStack();
  }

  loadStack() {
    if (!Storage) {
      return;
    }
    const stack = localStorage.getItem(this._localStorageKey);
    if (!stack || stack === '') {
      return this.historyStack = [];
    }
    this._saveStack = true;
    return this.historyStack = JSON.parse(stack);
  }

  saveStack(state: boolean) {
    this._saveStack = state;
    this.saveData();
  }

  getSaveStackStatus() {
    return this._saveStack;
  }

  addStack(url: string) {
    this.historyStack.push(this.generateStackElement(url));
    this.saveData();
  }

  getStack() {
    return JSON.parse(JSON.stringify(this.historyStack));
  }

  private generateStackElement(url: string): HistoryElement {
    return {
      id: this.historyStack.length,
      url: url
    };
  }

  private saveData() {
    if (!Storage || !this._saveStack) {
      return;
    }
    localStorage.setItem(this._localStorageKey, JSON.stringify(this.historyStack));
  }
}

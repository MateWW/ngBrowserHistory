import {HistoryElement} from './interfaces';

export class BrowsingHistory {

  private historyStack: [HistoryElement] = <[HistoryElement]>[];

  constructor() {
  }

  addStack(url: string) {
    this.historyStack.push(this.generateStackElement(url));
  }

  getStack() {
    return JSON.parse(JSON.stringify(this.historyStack));
  }

  getLast() {
    return JSON.parse(JSON.stringify(this.historyStack[this.historyStack.length - 1]));
  }

  private generateStackElement(url: string): HistoryElement {
    return {
      id: this.historyStack.length,
      url: url
    };
  }
}

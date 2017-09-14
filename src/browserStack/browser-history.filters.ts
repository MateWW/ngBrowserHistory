import {Subject} from 'rxjs/Subject';
import {FilteredHistoryElement, HistoryElement} from './interfaces';



export class BrowserHistoryFilters extends Subject<HistoryElement[]>{

  private static explodeUrl(url: string) {
    const split = url.split('/');
    if (split.length === 1 && split[0] === '') {
      return [];
    }
    return split;
  }

  private static convertToFiltered(stack: HistoryElement, segmentName: string, segmentId: number): FilteredHistoryElement {
    return Object.assign({}, stack, {
      segmentName,
      segmentId
    });
  }

  static parseByLastId(stack: HistoryElement[], id: number) {
    const filteredStack: FilteredHistoryElement[] = [];
    stack.forEach((stackElement: HistoryElement) => {
      const tempLen = filteredStack.length,
        lastElementUrl = tempLen > 0 ? filteredStack[tempLen - 1].url : '',
        lastElementUrlArray = BrowserHistoryFilters.explodeUrl(lastElementUrl),
        currentElementUrlArray = BrowserHistoryFilters.explodeUrl(stackElement.url);
      if (currentElementUrlArray.length === 0 || currentElementUrlArray.length - 1 < id) {
        return;
      } else if (lastElementUrlArray.length === 0 || currentElementUrlArray[id] !== lastElementUrlArray[id]) {
        filteredStack.push(BrowserHistoryFilters.convertToFiltered(stackElement, currentElementUrlArray[id], id));
      } else if (currentElementUrlArray[id] === lastElementUrlArray[id]) {
        filteredStack[tempLen - 1] = BrowserHistoryFilters.convertToFiltered(stackElement, currentElementUrlArray[id], id);
      }
    });
    return filteredStack;
  }


  static parseByFirstId(stack: HistoryElement[], id: number) {
    const filteredStack: FilteredHistoryElement[] = [];
    stack.forEach((stackElement: HistoryElement) => {
      const tempLen = filteredStack.length,
        lastElementUrl = tempLen > 0 ? filteredStack[tempLen - 1].url : '',
        lastElementUrlArray = BrowserHistoryFilters.explodeUrl(lastElementUrl),
        currentElementUrlArray = BrowserHistoryFilters.explodeUrl(stackElement.url);
      if (currentElementUrlArray.length === 0 || currentElementUrlArray.length - 1 < id) {
        return;
      } else if (lastElementUrlArray.length === 0 || currentElementUrlArray[id] !== lastElementUrlArray[id]) {
        filteredStack.push(BrowserHistoryFilters.convertToFiltered(stackElement, currentElementUrlArray[id], id));
      }
    });
    return filteredStack;
  }

  static parseByName(stack: HistoryElement[], name: string, segmentId?: number) {
    const filteredStack: FilteredHistoryElement[] = [];
    stack.forEach((stackElement: HistoryElement) => {
      const currentExplodeUrl = BrowserHistoryFilters.explodeUrl(stackElement.url);
      currentExplodeUrl.some((element, index) => {
        if (element === name) {
          if (segmentId) {
            if (segmentId === index) {
              filteredStack.push(BrowserHistoryFilters.convertToFiltered(stackElement, element, index));
            }
          } else {
            filteredStack.push(BrowserHistoryFilters.convertToFiltered(stackElement, element, index));
          }
          return true;
        }
        return false;
      });
    });
    return filteredStack;
  }
}

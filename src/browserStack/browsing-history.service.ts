import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BrowsingHistory} from './browser-history.strore';
import {Subject} from 'rxjs/Subject';
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import {HistoryElement} from './interfaces';
import {browser} from 'protractor';

@Injectable()
export class BrowsingHistoryService {

  private browsingStream = new Subject();
  private browsingHistory = new BrowsingHistory();

  private static explodeUrl(url: string) {
    const split = url.split('/');
    if (split.length === 1 && split[0] === "") {
      return [];
    }
    return split;
  }

  private static convertToFiltred(stack: HistoryElement, segmentName: string, segmentId: number) {
    return Object.assign({}, stack, {
      segmentName,
      segmentId
    });
  }


  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.browsingHistory.addStack(event.urlAfterRedirects);
        this.browsingStream.next(this.browsingHistory.getStack());
      }
    })
  }

  getLastUrl() {
    return this.browsingHistory.getLast();
  }

  getBySegmentId(id: number, position: string = "last") {
    const stack = this.browsingHistory.getStack();
    let parser;
    if (position === "last") {
      parser = this.browsingStream.startWith(stack).map((mappedStack) => this.parseByLastId(mappedStack, id));
    } else {
      parser = this.browsingStream.startWith(stack).map((mappedStack) => this.parseByFirstId(mappedStack, id));
    }
    return parser;
  }

  getBySegmentName(segmentName: string) {
  }

  // return every last element of

  private parseByLastId(stack: HistoryElement[], id: number) {
    const filteredStack: HistoryElement[] = [];
    stack.forEach((stackElement: HistoryElement) => {
      const tempLen = filteredStack.length,
        lastElementUrl = tempLen > 0 ? filteredStack[tempLen - 1].url : "",
        lastElementUrlArray = BrowsingHistoryService.explodeUrl(lastElementUrl),
        currentElementUrlArray = BrowsingHistoryService.explodeUrl(stackElement.url);
      if (currentElementUrlArray.length === 0 || currentElementUrlArray.length - 1 < id) {
        return;
      } else if (lastElementUrlArray.length === 0 || currentElementUrlArray[id] !== lastElementUrlArray[id]) {
        filteredStack.push(BrowsingHistoryService.convertToFiltred(stackElement,currentElementUrlArray[id], id));
      } else if (currentElementUrlArray[id] === lastElementUrlArray[id]) {
        filteredStack[tempLen - 1] = BrowsingHistoryService.convertToFiltred(stackElement,currentElementUrlArray[id], id);
      }
    });
    return filteredStack;
  }


  private parseByFirstId(stack: HistoryElement[], id: number) {
    const filteredStack: HistoryElement[] = [];
    stack.forEach((stackElement: HistoryElement) => {
      const tempLen = filteredStack.length,
        lastElementUrl = tempLen > 0 ? filteredStack[tempLen - 1].url : "",
        lastElementUrlArray = BrowsingHistoryService.explodeUrl(lastElementUrl),
        currentElementUrlArray = BrowsingHistoryService.explodeUrl(stackElement.url);
      if (currentElementUrlArray.length === 0 || currentElementUrlArray.length - 1 < id) {
        return;
      } else if (lastElementUrlArray.length === 0 || currentElementUrlArray[id] !== lastElementUrlArray[id]) {
        filteredStack.push(BrowsingHistoryService.convertToFiltred(stackElement, currentElementUrlArray[id], id));
      }
    });
    return filteredStack;
  }

}

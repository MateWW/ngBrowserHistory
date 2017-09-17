import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BrowsingHistory} from './browser-history.strore';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {BrowserHistoryFilters} from './browser-history.filters';

@Injectable()
export class BrowsingHistoryService {

  private browsingStream = new Subject();
  private browsingHistory = new BrowsingHistory();


  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.browsingHistory.addStack(event.urlAfterRedirects);
        this.browsingStream.next(this.browsingHistory.getStack());
      }
    });
  }

  cleanHistory(){
    this.browsingHistory.cleanStack();
    this.browsingStream.next(this.browsingHistory.getStack());
  }

  setSaveStatus(status: boolean) {
    this.browsingHistory.saveStack(status);
  }

  getSaveStatus() {
    return this.browsingHistory.getSaveStackStatus();
  }

  getHistory() {
    const stack = this.browsingHistory.getStack();
    return this.browsingStream.startWith(stack);
  }

  filterBySegmentId(id: number, position: string = 'last') {
    const stack = this.browsingHistory.getStack();
    let parser;
    if (position === 'last') {
      parser = this.browsingStream.startWith(stack).map((mappedStack) => BrowserHistoryFilters.parseByLastId(mappedStack, id));
    } else {
      parser = this.browsingStream.startWith(stack).map((mappedStack) => BrowserHistoryFilters.parseByFirstId(mappedStack, id));
    }
    return parser;
  }

  filterBySegment(segmentName: string, matchSegmentId?: number) {
    const stack = this.browsingHistory.getStack();
    return this.browsingStream.startWith(stack).map(
      (mappedStack) => BrowserHistoryFilters.parseByName(mappedStack, segmentName, matchSegmentId)
    );
  }

}

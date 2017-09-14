import {TestBed, inject, async, fakeAsync, tick} from '@angular/core/testing';

import {BrowsingHistoryService} from './browsing-history.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

class RouterMock {
  private events = new Subject();

  constructor() {
  }
}

describe('BrowsingHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowsingHistoryService, {provide: Router, useClass: RouterMock}]
    });
  });

  it('should be created', inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    expect(service).toBeTruthy();
  }));

  it('should parse empty stack', async(inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    service.filterBySegmentId(5).subscribe((val) => {
      expect(val.length).toBe(0);
    });
  })));

  it('should parse a few last elements in stack', inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/test/page/url'));
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '//page/second/url/test'));
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/page/last/'));

    service.filterBySegmentId(1).subscribe((val) => {
      expect(val[0].segmentName).toBe('test');
      expect(val[1].segmentName).toBe('');
      expect(val[2].segmentName).toBe('page');
    }).unsubscribe();

    service.filterBySegmentId(2).subscribe((val) => {
      expect(val[0].segmentName).toBe('page');
      expect(val[1].segmentName).toBe( 'last');
    }).unsubscribe();

    service.filterBySegmentId(4).subscribe((val) => {
      expect(val[0].segmentName).toBe('url');
    }).unsubscribe();

    service.filterBySegmentId(11).subscribe((val) => {
      expect(val.length).toBe(0);
    }).unsubscribe();
  }));

  it('should parse a few first elements in stack', inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/test/page/url'));
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '//page/second/url/test'));
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/page/last/'));
    service.filterBySegmentId(1, 'first').subscribe((val) => {
      expect(val[0].segmentName).toBe('test');
      expect(val[1].segmentName).toBe('');
      expect(val[2].segmentName).toBe('page');
    }).unsubscribe();
    service.filterBySegmentId(2, 'first').subscribe((val) => {
      expect(val[0].id).toBe(0);
      expect(val[0].segmentName).toBe('page');
      expect(val[1].segmentName).toBe('last');
    }).unsubscribe();
    service.filterBySegmentId(4, 'first').subscribe((val) => {
      expect(val[0].segmentName).toBe('url');
    }).unsubscribe();
    service.filterBySegmentId(11, 'first').subscribe((val) => {
      expect(val.length).toBe(0);
    }).unsubscribe();
  }));

  it('should parse by name with no selected segment', inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/test/page/url')); // id 0
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '//second/url/test'));  // id 1
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/test//page/last/'));  // id 2
    service.filterBySegment("page").subscribe((val) => {
      expect(val[0].segmentName).toBe('page');
      expect(val[0].id).toBe(0);
      expect(val[1].segmentName).toBe('page');
      expect(val[1].id).toBe(2);
      expect(val.length).toBe(2);
    }).unsubscribe();
    service.filterBySegment("page", 2).subscribe((val) => {
      expect(val.length).toBe(1);
      expect(val[0].id).toBe(0);
      expect(val[0].segmentName).toBe('page');
    }).unsubscribe();
    service.filterBySegment("this is empty").subscribe((val) => {
      expect(val.length).toBe(0);
    }).unsubscribe();
    service.filterBySegment("this is empty", 1).subscribe((val) => {
      expect(val.length).toBe(0);
    }).unsubscribe();
    service.filterBySegment("this is empty", 11).subscribe((val) => {
      expect(val.length).toBe(0);
    }).unsubscribe();
  }));

  it("should change save status", inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    (<any>service).browsingHistory = {
      saveStack: jasmine.createSpy('saveStack')
    };
    service.saveStackStatus(true)

    expect((<any>service).browsingHistory.saveStack ).toHaveBeenCalledWith(true);
  }));

  it("should change save status", inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    (<any>service).browsingHistory = {
      getSaveStackStatus: jasmine.createSpy('getSaveStackStatus').and.returnValue(true)
    };
    expect(service.getSaveStackStatus()).toBeTruthy();
  }));

  it("should get full stack", fakeAsync(inject([BrowsingHistoryService], (service: BrowsingHistoryService) => {
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/test/page/url'));
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '//page/second/url/test'));
    TestBed.get(Router).events.next(new NavigationEnd(0, '', '/page/last/'));
    tick();
    service.getHistory().subscribe( (stack) => {
      expect(stack.length).toBe(3);
    });
  })));

});

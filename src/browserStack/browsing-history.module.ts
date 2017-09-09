import {NgModule} from '@angular/core';
import {BrowsingHistoryService} from './browsing-history.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule
  ],
  providers: [
    BrowsingHistoryService
  ]
})
export class BrowsingHistoryModule {

  constructor(browsingHistory: BrowsingHistoryService) {
  }
}

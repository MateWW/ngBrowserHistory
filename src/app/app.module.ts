import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app.routing';

import { AppComponent } from './app.component';
import {BrowsingHistoryService} from '../browserStack/browsing-history.service';
import {BrowsingHistoryModule} from '../browserStack/browsing-history.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowsingHistoryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component} from '@angular/core';
import {BrowsingHistoryService} from '../browserStack/browsing-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }
}

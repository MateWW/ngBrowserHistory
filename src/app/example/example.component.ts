import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BrowsingHistoryService} from '../../browserStack/browsing-history.service';
import {FilteredHistoryElement, HistoryElement} from '../../browserStack/interfaces';

enum filter {
  name = 1,
  id
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl(''),
    segmentId: new FormControl(),
    save: new FormControl(),
    filterById: new FormControl(),
    filterByIdSection: new FormControl('first')
  });

  visible = false;

  stack: FilteredHistoryElement[] | HistoryElement[] = [];
  private stream;

  constructor(private browserHistoryService: BrowsingHistoryService) {
  }

  ngOnInit() {
    this.searchForm.controls.save.setValue(this.browserHistoryService.getSaveStatus());
    this.parseForm();
    this.chooseSubscription();

  }

  onHamburgerClick() {
    this.visible = !this.visible;
  }

  parseForm() {
    this.searchForm.valueChanges.subscribe((values) => {
      this.browserHistoryService.setSaveStatus(values.save);

      if (values.search === '' && !values.segmentId ) {
        this.chooseSubscription();
      } else if (values.search === '' && (!values.segmentId || !values.filterById)) {
        this.chooseSubscription();
      } else if (values.search.length > 0 && !values.segmentId) {
        this.chooseSubscription(filter.name, values.search);
      } else if (values.search.length > 0 && values.segmentId && values.filterById) {
        this.chooseSubscription(filter.name, values.search, values.segmentId);
      } else if (values.search === '' && values.segmentId && values.filterById) {
        this.chooseSubscription(filter.id, '', values.segmentId, values.filterByIdSection );
      }
    });
  }

  chooseSubscription(name?: number, segment?: string, id?: number, filterDirection?: string) {
    console.log(name, segment, id, filterDirection);
    if (this.stream) {
      this.stream.unsubscribe();
    }

    let stream;

    if (!name) {
      stream = this.browserHistoryService.getHistory();
    } else if (name === filter.name) {
      stream = this.browserHistoryService.filterBySegment(segment, id);
    } else if (name === filter.id) {
      stream = this.browserHistoryService.filterBySegmentId(id, filterDirection);
    }


    if (stream) {
      this.stream = stream.subscribe((stack) => {
        this.stack = stack;
      });
    }
  }

}

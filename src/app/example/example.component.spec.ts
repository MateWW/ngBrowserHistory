import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExampleComponent} from './example.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowsingHistoryService} from '../../browserStack/browsing-history.service';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  const browsingHistoryServiceMock = {
    getSaveStackStatus: () => true,
    getHistory() {
    },
    filterBySegment() {
    },
    filterBySegmentId() {
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ExampleComponent],
      providers: [
        {provide: BrowsingHistoryService, useValue: browsingHistoryServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

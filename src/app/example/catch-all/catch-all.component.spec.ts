import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CatchAllComponent} from './catch-all.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {ActivatedRoute} from '@angular/router';

describe('CatchAllComponent', () => {
  let component: CatchAllComponent;
  let fixture: ComponentFixture<CatchAllComponent>;

  const activatedRouteMock = {
    params: Observable.of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatchAllComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

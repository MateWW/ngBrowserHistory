import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchAllComponent } from './catch-all.component';

describe('CatchAllComponent', () => {
  let component: CatchAllComponent;
  let fixture: ComponentFixture<CatchAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchAllComponent ]
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

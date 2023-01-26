import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineActComponent } from './timeline-act.component';

describe('TimelineActComponent', () => {
  let component: TimelineActComponent;
  let fixture: ComponentFixture<TimelineActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

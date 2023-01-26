import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPassComponent } from './activity-pass.component';

describe('ActivityPassComponent', () => {
  let component: ActivityPassComponent;
  let fixture: ComponentFixture<ActivityPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

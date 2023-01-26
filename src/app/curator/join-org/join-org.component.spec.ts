import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrgComponent } from './join-org.component';

describe('JoinOrgComponent', () => {
  let component: JoinOrgComponent;
  let fixture: ComponentFixture<JoinOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

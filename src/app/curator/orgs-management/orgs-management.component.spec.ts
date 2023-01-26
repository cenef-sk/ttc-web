import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgsManagementComponent } from './orgs-management.component';

describe('OrgsManagementComponent', () => {
  let component: OrgsManagementComponent;
  let fixture: ComponentFixture<OrgsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

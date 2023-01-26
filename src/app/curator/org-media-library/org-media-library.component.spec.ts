import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMediaLibraryComponent } from './org-media-library.component';

describe('OrgMediaLibraryComponent', () => {
  let component: OrgMediaLibraryComponent;
  let fixture: ComponentFixture<OrgMediaLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMediaLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMediaLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

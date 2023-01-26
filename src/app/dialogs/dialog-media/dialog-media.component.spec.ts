import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMediaComponent } from './dialog-media.component';

describe('DialogMediaComponent', () => {
  let component: DialogMediaComponent;
  let fixture: ComponentFixture<DialogMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

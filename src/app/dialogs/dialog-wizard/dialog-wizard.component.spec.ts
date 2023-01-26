import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWizardComponent } from './dialog-wizard.component';

describe('DialogWizardComponent', () => {
  let component: DialogWizardComponent;
  let fixture: ComponentFixture<DialogWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

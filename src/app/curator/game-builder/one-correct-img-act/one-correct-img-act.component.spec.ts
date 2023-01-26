import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCorrectImgActComponent } from './one-correct-img-act.component';

describe('OneCorrectImgActComponent', () => {
  let component: OneCorrectImgActComponent;
  let fixture: ComponentFixture<OneCorrectImgActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCorrectImgActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCorrectImgActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

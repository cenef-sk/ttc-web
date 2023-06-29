import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCorrectImgActItemComponent } from './one-correct-img-act-item.component';

describe('OneCorrectImgActItemComponent', () => {
  let component: OneCorrectImgActItemComponent;
  let fixture: ComponentFixture<OneCorrectImgActItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCorrectImgActItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCorrectImgActItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

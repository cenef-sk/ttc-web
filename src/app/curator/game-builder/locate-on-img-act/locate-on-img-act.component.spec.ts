import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateOnImgActComponent } from './locate-on-img-act.component';

describe('LocateOnImgActComponent', () => {
  let component: LocateOnImgActComponent;
  let fixture: ComponentFixture<LocateOnImgActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateOnImgActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateOnImgActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

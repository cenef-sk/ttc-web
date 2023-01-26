import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenQuestionItemComponent } from './open-question-item.component';

describe('OpenQuestionItemComponent', () => {
  let component: OpenQuestionItemComponent;
  let fixture: ComponentFixture<OpenQuestionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenQuestionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenQuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizActComponent } from './quiz-act.component';

describe('QuizActComponent', () => {
  let component: QuizActComponent;
  let fixture: ComponentFixture<QuizActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryActComponent } from './memory-act.component';

describe('MemoryActComponent', () => {
  let component: MemoryActComponent;
  let fixture: ComponentFixture<MemoryActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

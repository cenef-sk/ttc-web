import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingLayoutComponent } from './gaming-layout.component';

describe('GamingLayoutComponent', () => {
  let component: GamingLayoutComponent;
  let fixture: ComponentFixture<GamingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

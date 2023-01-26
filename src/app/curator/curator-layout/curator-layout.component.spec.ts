import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorLayoutComponent } from './curator-layout.component';

describe('CuratorLayoutComponent', () => {
  let component: CuratorLayoutComponent;
  let fixture: ComponentFixture<CuratorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuratorLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuratorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

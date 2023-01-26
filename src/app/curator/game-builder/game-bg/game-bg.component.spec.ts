import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBgComponent } from './game-bg.component';

describe('GameBgComponent', () => {
  let component: GameBgComponent;
  let fixture: ComponentFixture<GameBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

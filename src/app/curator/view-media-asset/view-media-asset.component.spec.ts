import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMediaAssetComponent } from './view-media-asset.component';

describe('ViewMediaAssetComponent', () => {
  let component: ViewMediaAssetComponent;
  let fixture: ComponentFixture<ViewMediaAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMediaAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMediaAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

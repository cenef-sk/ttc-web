import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMediaAssetComponent } from './new-media-asset.component';

describe('NewMediaAssetComponent', () => {
  let component: NewMediaAssetComponent;
  let fixture: ComponentFixture<NewMediaAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMediaAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMediaAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

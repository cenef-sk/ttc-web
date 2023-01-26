import { TestBed } from '@angular/core/testing';

import { MyslimService } from './myslim.service';

describe('MyslimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyslimService = TestBed.get(MyslimService);
    expect(service).toBeTruthy();
  });
});

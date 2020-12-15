import { TestBed } from '@angular/core/testing';

import { DataSpainService } from './data-spain.service';

describe('DataSpainService', () => {
  let service: DataSpainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSpainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

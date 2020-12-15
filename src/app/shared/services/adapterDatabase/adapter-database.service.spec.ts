import { TestBed } from '@angular/core/testing';

import { AdapterDatabaseService } from './adapter-database.service';

describe('AdapterDatabaseService', () => {
  let service: AdapterDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

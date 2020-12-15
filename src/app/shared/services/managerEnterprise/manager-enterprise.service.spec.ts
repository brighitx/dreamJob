import { TestBed } from '@angular/core/testing';

import { ManagerEnterpriseService } from './manager-enterprise.service';

describe('ManagerEnterpriseService', () => {
  let service: ManagerEnterpriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerEnterpriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

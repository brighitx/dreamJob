import { TestBed } from '@angular/core/testing';

import { ManagerOfferService } from './manager-offer.service';

describe('ManagerOfferService', () => {
  let service: ManagerOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

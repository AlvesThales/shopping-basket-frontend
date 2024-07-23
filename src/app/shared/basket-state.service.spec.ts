import { TestBed } from '@angular/core/testing';

import { BasketStateService } from './basket-state.service';

describe('BasketStateService', () => {
  let service: BasketStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

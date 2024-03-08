import { TestBed } from '@angular/core/testing';

import { PricingPlanService } from './pricing-plan.service';

describe('PricingPlanService', () => {
  let service: PricingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

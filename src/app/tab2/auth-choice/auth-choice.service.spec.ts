import { TestBed } from '@angular/core/testing';

import { AuthChoiceService } from './auth-choice.service';

describe('AuthChoiceService', () => {
  let service: AuthChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IsSavedGuard } from './is-saved.guard';

describe('IsSavedGuard', () => {
  let guard: IsSavedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSavedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
